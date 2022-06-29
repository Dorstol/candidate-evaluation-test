'use strict';


const userSection = document.querySelector('#users')
const usersTemplate = document.querySelector('#users-template')


getData();

async function getData(){
    //Get data from local server
    const usersData = await fetch('http://localhost:3000/users');
    const users = await usersData.json();
    const infoAboutUsers = users.data;
    const loadMore = document.getElementById('button');
    let i = 0;


    //render user cards template with received data
    infoAboutUsers.forEach(user => {
        i++;
        if( i <= users.per_page ){
            const avatar = user.avatar;
            const firstName = user.first_name;
            const lastName = user.last_name;
            const email = user.email;

            const newUser = document.importNode(usersTemplate.content, true);
            const userEmail = newUser.querySelector('.user__email');
            const fullName = newUser.querySelector('.user__fullName');
            const userAvatar = newUser.querySelector('.user__avatar');

            userEmail.innerText = email;
            fullName.innerText = firstName + ' ' +  lastName;
            userAvatar.src = avatar;
            userSection.appendChild(newUser);
        }
    // button "load more" for more cards
        loadMore.addEventListener('click' , () => {
            for (const user of infoAboutUsers) {
                i++;
                if (i <= users.total) {
                    const avatar = user.avatar;
                    const firstName = user.first_name;
                    const lastName = user.last_name;
                    const email = user.email;

                    const newUser = document.importNode(usersTemplate.content, true);
                    const userEmail = newUser.querySelector('.user__email');
                    const fullName = newUser.querySelector('.user__fullName');
                    const userAvatar = newUser.querySelector('.user__avatar');

                    userEmail.innerText = email;
                    fullName.innerText = firstName + ' ' + lastName;
                    userAvatar.src = avatar;
                    userSection.appendChild(newUser);
                }
                //
                if (i > users.total) {
                    loadMore.innerText = 'This is all cards that we have :(';
                }
            }
        })
    })
}
