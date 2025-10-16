# Object Class Definition

A JSON file used to define object classes associated with a model role. When a model for that model role is loaded, the model manager will generate configs for each of the object classes defined.

Example:

```
    {
        "model_role_one": ["object_class_a", "object_class_b"],
        "model_role_two": ["object_class_c"]
    }   
```

The configuration file must be mounted to this location ```/app/object_class_def.json``` inside the model manager container.

### **This is only for models from GoFactory**
The object class list for static models must be defined as part of the static manifest
