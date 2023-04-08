const searchHotel = () => {
    //search hotel
    let input = document.querySelector('#searchInput')
    let query = input.value.toUpperCase();
    let hotelCards = document.querySelectorAll('.hotel-card')
    let hotelNames = document.querySelectorAll('.hotel-name')
    for(let i=0; i<hotelNames.length; ++i){
        let name = hotelNames[i].innerText.toUpperCase();
        if(name.indexOf(query) != -1){
            hotelCards[i].style.display = 'block'
        } else {
            hotelCards[i].style.display = 'none'
        }
    }
}