export default class Model
{
    static id = 0;
    static state = {};
    static setState = null;

    static typeSettings = {
        success: {
            bgColor: '#27ae60',
            icon: 'fog-x'
        },
        error: {
            bgColor: '#e74c3c',
            icon: 'fog-x'
        },
        warning: {
            bgColor: '#f1b014',
            icon: 'fog-x'
        }
    }

    static show(settings)
    {
        let type = (Model.typeSettings[settings.type]) ? settings.type: 'error';
        Model.id += 1;
        let newToast = {
            id: Model.id,
            visible: true,
            type: type,
            message: settings.message,
            duration: settings.duration > 0 || settings.duration === 0 ? settings.duration: 300,
            position: settings.position ? settings.position: 'top',
            autoClose: settings.autoClose === false ? false: true,
            bgColor: Model.typeSettings[type].bgColor,
            icon: Model.typeSettings[type].icon,
        }
        Model.state.toasts.push(newToast);
        Model.setState(Model.state);
        return Model.id;
    }

    static hide(id=0)
    {
        if(id > 0){
            for(let i in Model.state.toasts){
                if(Model.state.toasts[i].id === id){
                    Model.state.toasts[i].visible = false;
                    break;
                }
            }
        }else{
            Model.state.toasts = [];
        }
        Model.setState(Model.state);
    }

    static terminate(id=0)
    {
        if(id > 0){
            for(let i in Model.state.toasts){
                if(Model.state.toasts[i].id === id){
                    Model.state.toasts.splice(i,1);
                    break;
                }
            }
        }else{
            Model.state.toasts = [];
        }
        Model.setState(Model.state);
    }
}
