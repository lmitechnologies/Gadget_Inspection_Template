import cv2
import numpy as np
import os
import open3d

# utility methods
class NumpyUtils():
    def png_to_npy(self,src, dst):
        files = [f for f in os.listdir(src) if os.path.isfile(os.path.join(src, f)) and ".png" in f]

        for f in files:
            print(os.path.join(src, f))
            np_frame = cv2.imread(os.path.join(src, f))
            np.save(os.path.join(dst, f.replace('.png', '.npy')), np_frame)

    def npy_to_png(self,src, dst):
        files = [f for f in os.listdir(src) if os.path.isfile(os.path.join(src, f)) and ".npy" in f]

        for f in files:
             print(os.path.join(src, f))
             np_frame = np.load(os.path.join(src, f))
             cv2.imwrite(os.path.join(dst, f.replace('.npy', '.png')), np_frame)

    def pcd_to_npy(self, src, dst):
        files = [f for f in os.listdir(src) if os.path.isfile(os.path.join(src, f)) and ".pcd" in f]

        for f in files:
            pc = open3d.io.read_point_cloud(os.path.join(src, f), remove_nan_points=False, remove_infinite_points=False)
            pts = np.asarray(pc.points)
            np.save(os.path.join(dst, f.replace('.pcd', '.npy')), pts)


if __name__=="__main__":
    import argparse
    ap=argparse.ArgumentParser()
    ap.add_argument('--option',required=True,help='npy_2_png or png_2_npy or pcd_2_npy')
    ap.add_argument('--src',required=True)
    ap.add_argument('--dest',required=True)
    args=vars(ap.parse_args())
    option=args['option']
    src=args['src']
    dest=args['dest']

    translate=NumpyUtils()

    print(f'Src: {src}')
    print(f'Dest: {dest}')

    if not os.path.isdir(dest):
        os.makedirs(dest)

    if option=='npy_2_png':
        translate.npy_to_png(src,dest)
    elif option=='png_2_npy':
        translate.png_to_npy(src,dest)
    elif option=='pcd_2_npy':
        translate.pcd_to_npy(src,dest)
    else:
        raise Exception('Input option must be npy_2_png or png_2_npy or pcd_2_npy')
    