import cv2
import random
import numpy as np
from enum import IntFlag

from image_utils.img_resize import resize


class Decision(IntFlag):
    NONE = 0
    ANOMALY = 1
    DEFECT = 2
    BOTH = 3
    def __str__(self):
        # for consistency, str of NONE is 'None',
        # while others are of lower case.
        if self.value == self.NONE:
            return 'None'
        return f'{self.name.lower()}'

def render_profile(profile: np.ndarray):
    NULL_VALUE = np.iinfo(np.int16).min         # -32768
    normal_points = profile[profile!=NULL_VALUE]
    png = np.where(profile != NULL_VALUE, 1.0 + 254.0 * (profile - normal_points.min()) / (normal_points.max() - normal_points.min()), 0.0)
    return png.astype(np.uint8)

def plot_one_box(box, img, mask=None, mask_threshold:int=0, color=None, label=None, line_thickness=None):
    """
    description: Plots one bounding box and mask (optinal) on image img,
                 this function comes from YoLov5 project.
    param: 
        box:    a box likes [x1,y1,x2,y2]
        img:    a opencv image object in BGR format
        mask:   a binary mask for the box
        color:  color to draw rectangle, such as (0,255,0)
        label:  str
        line_thickness: int
    return:
        no return
    """
    tl = (
        line_thickness or round(0.002 * (img.shape[0] + img.shape[1]) / 2) + 1
    )  # line/font thickness
    color = color or [random.randint(0, 255) for _ in range(3)]
    if isinstance(box, list):
        box = np.array(box).astype(int).tolist()
    # x1,y1,x2,y2 = box.astype(np.int)
    c1, c2 = box
    x1,y1 = c1
    x2,y2 = c2
    # c1, c2 = (x1,y1),(x2,y2)

    # wrap c1,c2 with tuple required by opencv 4.5.0
    cv2.rectangle(img, tuple(c1), tuple(c2), color, thickness=tl, lineType=cv2.LINE_AA)
    if mask is not None:
        w,h = x2-x1,y2-y1
        mask = resize(np.array(mask), width=w, height=h, device='cpu')
        m = mask>mask_threshold
        #crop to ensure inside the image
        h_im,w_im = img.shape[:2]
        x2 = min(x2,w_im-1)
        y2 = min(y2,h_im-1)
        w,h = x2-x1,y2-y1
        m = m[:h,:w]
        blended = (0.4 * np.array(color,dtype=np.float) + 0.6 * img[y1:y2,x1:x2,:][m]).astype(np.uint8)
        img[y1:y2,x1:x2,:][m] = blended
    if label:
        tf = max(tl - 1, 1)  # font thickness
        t_size = cv2.getTextSize(label, 0, fontScale=tl / 4, thickness=tf)[0]
        c2 = c1[0] + t_size[0], c1[1] - t_size[1] - 3
        cv2.rectangle(img, tuple(c1), tuple(c2), color, cv2.FILLED, cv2.LINE_AA)  # filled
        cv2.putText(
            img,
            label,
            (c1[0], c1[1] - 2),
            0,
            tl / 4,
            [225, 255, 255],
            thickness=tf,
            lineType=cv2.LINE_AA,
        )  