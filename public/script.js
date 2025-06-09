/* 
    CIT 281 Lab 8: script file 
    Author: Mikayla Gooodi 
*/

fetch('/photos')
  .then(response => response.json())
  .then(data => {
    const list = document.getElementById('photo-list');
    data.forEach(photo => {
      const li = document.createElement('li');
      li.textContent = photo.title;
      li.dataset.id = photo.id;
      li.addEventListener('click', () => {
        fetch(`/photos/${photo.id}`)
          .then(response => response.json())
          .then(photoData => {
            const details = document.getElementById('details');
            details.textContent = JSON.stringify(photoData, null, 2);
            document.getElementById('photo-details').classList.remove('hidden');
          })
          .catch(err => alert('Error fetching photo details'));
      });
      list.appendChild(li);
    });
  })
  .catch(err => alert('Error fetching photo list'));

  