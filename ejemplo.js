// <div class="card__container">
//     <div class="card__controls">
//         <button class="trash"></button>
//         <button class="fav"></button>
//         <button class="down"></button>
//         <button class="max"></button>

//     </div>

//     <div class="card__content">
//         <figure class="image"></figure>
//         <section class="info">
//             <div class="user"></div>
//             <div class="title"></div>
//         </section>
//     </div>

// </div>




class Card {

    constructor() {

        this.properties = {
            cardContainer: {
                isChildOf:'card',
                orderRender: 0,
                componentType: 'div',
                attributes:[],
                classList: ['card', 'card__container'],

            },
            cardControls: {
                isChildOf:'cardContainer',
                orderRender: 1,
                componentType: 'div',
                attributes:[],
                classList: ['card', 'card__controls'],

            },
            cardContent: {
                isChildOf:'cardContainer',
                orderRender: 2,
                componentType: 'div',
                attributes:[],
                classList: ['card', 'card__content'],

            },

            buttonTrash: {
                isChildOf:'cardControls',
                orderRender:3,
                componentType: 'div',
                attributes:[],
                classList: ['card', 'trash'],

            },
            buttonFav: {
                isChildOf:'cardControls',
                orderRender:4,
                componentType: 'div',
                attributes:[],
                classList: ['card', 'fav'],

            },
            buttonDown: {
                isChildOf:'cardControls',
                orderRender:5,
                componentType: 'div',
                attributes:[],
                classList: ['card', 'down'],

            },
            buttonMax: {
                isChildOf:'cardControls',
                orderRender:6,
                componentType: 'div',
                attributes:[],
                classList: ['card', 'max'],

            },

            figure: {
                isChildOf:'cardContent',
                orderRender:7,
                componentType: 'figure',
                attributes:[],
                classList: ['card', 'image'],

            },
            sectionInfo: {
                isChildOf:'cardContent',
                orderRender:8,
                componentType: 'section',
                attributes:[],
                classList: ['card', 'info'],

            },
            userInfo: {
                isChildOf:'sectionInfo',
                orderRender:9,
                componentType: 'div',
                attributes:[],
                classList: ['card', 'user'],

            },
            titleInfo: {
                isChildOf:'sectionInfo',
                orderRender:10,
                componentType: 'div',
                attributes:[],
                classList: ['card', 'title'],

            },
        }

        this.createElementCard = (properties)=>{

            const object = Object.assign({},properties);
            for (const key in object) {
                if (Object.hasOwnProperty.call(object, key)) {
                    const component = object[key];

                    const element = document.createElement(component.componentType);
                    component.attributes.forEach(attribute => {
                        element.setAttribute(attribute.type,attribute.value);
                    });
                    component.classList.forEach(classCSS => {
                        element.classList.add(classCSS);
                    });

                    component['elementDOM'] = element;
                    
                }
            }

            return object;
        };

        // this.cardContainer = document.createElement('div');
        // this.cardControls = document.createElement('div');
        // this.cardContent = document.createElement('div');

        // this.buttonTrash = document.createElement('button');
        // this.buttonFav = document.createElement('button');
        // this.buttonDown = document.createElement('button');
        // this.buttonMax = document.createElement('button');

        // this.figure = document.createElement('figure');
        // this.sectionInfo = document.createElement('section');
        // this.userInfo = document.createElement('div');
        // this.titleInfo = document.createElement('div');


        // cardContainer.classList.add('card__container');

        this.card = this.createElementCard(this.properties);


    }

    getCard(){

        const card = document.createElement('div');
        const components=[];

        for (const key in this.card) {
            if (Object.hasOwnProperty.call(this.card, key)) {
                const component = this.card[key];

                components[component.orderRender]=component;
                
            }
        }

        components.forEach((component,index) => {
            
            if(index === 0) card.append(component.elementDOM);
            else this.card[component.isChildOf].elementDOM.append(component.elementDOM);
        });

        return card;
    }


}

const card1 = new Card();

console.log(card1.getCard());

const main = document.getElementsByTagName('main')[0];

main.append(card1.getCard());