//aspettare che il dom sia pronto
document.addEventListener("DOMContentLoaded", function(){
    //prendere tutte le immagini con classe lazy
    let lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
    let active = false;
   
    const lazyLoad = function() {
        if(active === false) {
            active = true;

            setTimeout(function() {
                  //per ogni immagine:
            lazyImages.forEach(function(lazyImages) {
                //capire se l'immagine è in vista e se è visibile
                if( (lazyImages.getBoundingClientRect().top <= window.innerHeight && lazyImages.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyImages).display !== "none"){
                    //istrato src e srcset con data-src e data-srcset 
                    lazyImages.src = lazyImages.dataset.src
                    

                    if(lazyImages.dataset.srcset) {
                        lazyImages.srcset = lazyImages.dataset.srcset
                    }

                    //rimuovo la classe lazy per non ripetere l'operazione su questa immagine
                    lazyImages.classList.remove("Lazy");

                    //tolgo l'immagine corrente all'array delle immagini ancora da fare
                    lazyImages = lazyImages.filter(function(image){
                        return image !== lazyImages;
                    })

                    // rimuovo i listeners
                    if(lazyImages.length === 0 ) {
                        document.removeEventListener("scroll", lazyLoad);
                        window.removeventListener("resize", lazyLoad);
                        window.removeEventListener("orientationchange", lazyLoad);   
                    }
                }
            });
            active = false;
          
        }, 200);
            
            

    

            
        }
    }

    lazyLoad();

    document.addEventListener("scroll", lazyLoad);
    window.addEventListener("resize", lazyLoad);
    window.addEventListener("orientationchange", lazyLoad);

})


