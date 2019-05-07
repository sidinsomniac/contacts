let areaRange = document.querySelector('#commissionerate');

areaRange.disabled = true;
document.querySelector('#submit').disabled = true;

fetch('./contacts.json')
    .then(data => data.json())
    .then(data => {
        document.querySelector('#zone').addEventListener('change', function () {

            areaRange.innerHTML = `<option value="" disabled selected>Choose your Zone</option>`;
            areaRange.disabled = false;

            let commissionerateSet = new Set();

            data.forEach(zone => {
                if (zone.zone === this.value) {
                    commissionerateSet.add(zone.commissionerate);
                }
            });

            let commissionerateArr = Array.from(commissionerateSet);

            commissionerateArr.forEach(comm => {
                areaRange.innerHTML += `<option value='${comm}'>${comm}</option>`;
            });
        });

        areaRange.addEventListener('change', function () {
            document.querySelector('#submit').disabled = false;
        });

        document.querySelector('#submit').addEventListener('click', function () {
            document.querySelector('#contact-list').innerHTML = '';
            data.forEach(zone => {
                if (areaRange.value === zone.commissionerate) {
                    document.querySelector('#contact-list').innerHTML += `<button class="accordion"><span class="address">${zone.address}</span></button>
                    <div class="panel">
                        <ul>
                            <li><b>Phone:</b> ${zone.phone}</li>
                            <li><b>Fax:</b> ${zone.fax}</li>
                            <li><b>Email:</b> ${zone.email}</li>
                        </ul>
                    </div>

                    `;
                }
            });

            var acc = document.getElementsByClassName("accordion");
            var i;

            for (i = 0; i < acc.length; i++) {
                acc[i].addEventListener("click", function () {
                    /* Toggle between adding and removing the "active" class,
                    to highlight the button that controls the panel */
                    this.classList.toggle("active");

                    /* Toggle between hiding and showing the active panel */
                    var panel = this.nextElementSibling;
                    if (panel.style.display === "block") {
                        panel.style.display = "none";
                    } else {
                        panel.style.display = "block";
                    }
                });
            }

        });
    })
    .catch(err => console.log(err))