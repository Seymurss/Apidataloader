const apiUrl = 'https://picsum.photos/v2/list?page=2&limit=12';
const options = {
    method: 'GET',
};

async function fetchData() {
    try {
        const loaderElement = document.getElementById('loader');
      
        const response = await fetch(apiUrl, options);

        if (response.ok) {
            const dataElement = document.getElementById('data');
            const data = await response.json();
    

            let dataIndex = 0;
            const interval = 500;
            const totalDataCount = data.length;

            function fetchDataItem() {
                if (dataIndex < totalDataCount) {
                    loaderElement.style.display = 'block';
                    dataElement.style.display = 'none';
                    const item = data[dataIndex];
                    const itemHtml = `
                        <div class="imgbox">
                            <img src="${item.download_url}" alt="Resim">
                            <p>${item.author}</p>
                        </div>
                    `;

                    dataElement.innerHTML += itemHtml;
                    dataIndex++;
                    setTimeout(fetchDataItem, interval);
                }else{
                    loaderElement.style.display = 'none';
                    dataElement.style.display = 'block';
                }
            }


            fetchDataItem();
        } else {
            console.error('datalar yuklenmedi. HTTP xeta Kodu:', response.status);
        }
    } catch (error) {
        console.error('Bir xeta movcuddr:', error);
    }
}

fetchData();





