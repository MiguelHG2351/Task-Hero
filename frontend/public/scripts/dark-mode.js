(function initTheme() {
    const theme = localStorage.getItem('theme');

    if (theme != null) {
        theme == 'light' ? document.body.classList.add('light') : document.body.classList.add('dark');
    } else {
        const schema = matchMedia('(prefers-color-scheme: dark)')
        let body = document.body
        let newClass = !schema.matches ? 'light' : 'dark';
        replaceClass(body, newClass, body.classList[0]);
        schema.addEventListener('change', e => {
            let newClass = !e.matches ? 'light' : 'dark';
            replaceClass(body, newClass, body.classList[0]);
            
        })
    }
  })()

/**
 * 
 * @param {HTMLElement} $element Node element
 * @param {String} className Nombre de la clase nueva
 * @param {String} [oldClassName] Nombre de la clase nueva
 */

function replaceClass($element, className, oldClassName) {
    if(oldClassName && $element.classList.contains(oldClassName)) {
        $element.classList.replace(oldClassName, className);	
    } else {
        $element.classList.add(className);
    }
}
