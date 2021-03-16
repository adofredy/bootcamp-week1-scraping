let btnscrap = document.getElementById('scrap-profile')

btnscrap.addEventListener('click', async ()=>{
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if(tab!==null){
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: scrapingProfile,
          });
    }
})

const scrapingProfile = ()=>{
    const wait = function(milliseconds){
        return new Promise(function(resolve){
            setTimeout(function() {
                resolve();
            }, milliseconds);
        });
    };


    const elementNameProfile = document.querySelector("div.ph5.pb5 > div.display-flex.mt2 ul li")
    
    const elementNameTitle = document.querySelector("div.ph5.pb5 > div.display-flex.mt2 h2")

    const name = elementNameProfile? elementNameProfile.innerText:'';
    const title = elementNameTitle? elementNameTitle.innerText:'';
    const location = elementNameLocation? elementNameLocation.innerText: '';
    

    const elementMoreResume = document.getElementById('line-clamp-show-more-button')
    if(elementMoreResume) elementMoreResume.click();

    document.querySelector(".global-footer.global-footer--static.ember-view").scrollIntoView()
    
    wait(2000).then(()=>{
        const resume = document.querySelector('section.pv-about-section > p')?.innerText || ""
        console.log({ name, title, resume })
        // const profile = {name,title,resume} 

        const experienceContainer = document.querySelector('#experience-section ul')
        let experience = []
        Array.from(experienceContainer.querySelectorAll("li div.pv-entity__summary-info"))
        .map(experienceElement =>{
            const company = experienceElement.querySelector("p.pv-entity__secondary-title")?.innerText || ""
            const period = experienceElement.querySelectorAll("h4 span")[1]?.innerText || ""
            const functions = experienceElement.querySelector("h3")?.innerText || ""
            experience.push({company, period, functions})

        })
    })


    // const elementDetail = document.querySelector('div.profile-detail')

    
    console.log({name,title,resume})
}