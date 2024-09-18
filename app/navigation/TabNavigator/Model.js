export default class Model
{
    static showTabs=null;
    static hideTabs=null;
    static visible=true;

    static show()
    {
        if(Model.showTabs)
        {
            Model.visible=true;
            Model.showTabs();
        }
    }

    static hide()
    {
        if(Model.hideTabs)
        {
            Model.visible=false;
            Model.hideTabs();
        }
    }
}