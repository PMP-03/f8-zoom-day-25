function Tabs(selector){
    this.container = document.querySelector(selector);
    this.container.tabIndex = 0;
    this.id = this.container.id

    if (!this.container) {
        console.error(`Tabzy: No container found for selector '${selector}'`);
        return;
    }

    this.tabs = this.container.querySelectorAll(".tab-button")
    if (!this.tabs.length) {
        console.error(`Tabzy: No tabs found inside the container`);
        return;
    }

    this.panels = this.container.querySelectorAll(".tab-content__panel");
    if (this.tabs.length !== this.panels.length) return;

    this._init();

    this.container.addEventListener('click', () => {
        this.container.focus();
    });

    this.container.addEventListener('keydown', (event) => {
        const index = Number(event.key) - 1;

         if(index >= 0 && index < this.tabs.length){
            this._activateTab(this.tabs[index], index)
         }
    })
}

Tabs.prototype._init = function(){
    const params = new URLSearchParams(location.search)
    const currentTab = Number(params.get(this.id)) ?? 0;
    const tabIndex = currentTab;
    this.tabs[tabIndex].classList.add('active')
    this.panels[tabIndex].classList.add('active')

    this.tabs.forEach((tab, index) => {
        tab.onclick = () => {
            this._activateTab(tab, index);
        }
    })
    
}

Tabs.prototype._activateTab = function(tab, index){
    this.tabs.forEach(element => {
        element.classList.remove('active');
    });
    this.panels.forEach(element => {
        element.classList.remove('active');
    });

    tab.classList.add('active');
    this.panels[index].classList.add('active');

    const params = new URLSearchParams(location.search);
    if(index === 0){
        params.delete(this.id);
    }else{
        params.set(this.id, index);
    }

    const paramsStr = params.size ? `?${params}` : "";
    const newUrl = `${location.pathname}${paramsStr}${location.hash}`;

    history.replaceState(null, null, newUrl );
    console.log(params)
}

