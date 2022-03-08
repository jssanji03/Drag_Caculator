const dataTableRWD = $('.datatable-RWD').DataTable(
    {
        responsive: true,
        searching: false,
        "paging": false,
        "ordering": false,
        "info": false,
        "autoWidth": true,
        scroller: true,
    }
);
const addCart = () => {
    const plus = document.querySelector(".js-add")
    const minus = document.querySelector(".js-minus")
    const display = document.querySelector(".js-num")
    let counterVal = 1;
    
    plus.addEventListener("click", () => {
        if (counterVal >= 10) {
            return false
        } else {
            // minus.disabled=false;
            displayMode(counterVal += 1)
        }
    })
    minus.addEventListener("click", () => {
        if (counterVal <= 0) {
            // minus.disabled=true;
            return false
        } else {
            displayMode(counterVal -= 1)
            // plus.disabled=false;
        }
    })
    function displayMode(counterVal) {
        btnDisplay()
        display.value = counterVal
    }
    function btnDisplay() {
        if (counterVal >= 10) {
            plus.disabled=true;
        } else if (counterVal <= 0) {
            minus.disabled=true;
        } else {
            plus.disabled = false;
            minus.disabled=false;
        }
    }
    displayMode(counterVal)
    
}
export { dataTableRWD,addCart };