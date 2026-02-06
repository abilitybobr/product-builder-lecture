class LottoGenerator extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    text-align: center;
                }
                h2 {
                    color: #333;
                    font-size: 2.5rem;
                    margin-bottom: 30px;
                    font-weight: 700;
                    letter-spacing: -1px;
                }
                .numbers {
                    display: flex;
                    justify-content: center;
                    gap: 15px;
                    margin-bottom: 40px;
                    flex-wrap: wrap;
                }
                .number {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    font-size: 1.8rem;
                    font-weight: 600;
                    color: white;
                    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                    opacity: 0;
                    animation: fadeInScale 0.5s ease-out forwards;
                }

                @keyframes fadeInScale {
                    from {
                        opacity: 0;
                        transform: scale(0.8);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }

                .number:hover {
                    transform: translateY(-3px) scale(1.05);
                    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
                }

                button {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    border: none;
                    padding: 18px 35px;
                    font-size: 1.2rem;
                    font-weight: 600;
                    border-radius: 50px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    box-shadow: 0 10px 20px rgba(118, 75, 162, 0.3), 0 5px 5px rgba(0,0,0,0.1);
                    outline: none;
                }
                button:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 12px 25px rgba(118, 75, 162, 0.4), 0 8px 8px rgba(0,0,0,0.1);
                }
                button:active {
                    transform: translateY(1px);
                     box-shadow: 0 5px 10px rgba(118, 75, 162, 0.3), 0 2px 2px rgba(0,0,0,0.1);
                }
            </style>
            <h2>로또 번호 생성기</h2>
            <div class="numbers"></div>
            <button>번호 생성</button>
        `;

        this.shadowRoot.querySelector('button').addEventListener('click', () => this.generateNumbers());
        this.generateNumbers(); // 초기 로딩 시 번호 생성
    }

    generateNumbers() {
        const numbersContainer = this.shadowRoot.querySelector('.numbers');
        numbersContainer.innerHTML = '';
        const numbers = new Set();
        while (numbers.size < 6) {
            numbers.add(Math.floor(Math.random() * 45) + 1);
        }

        const pastelColors = [
            '#FFADAD', '#FFD6A5', '#FDFFB6', '#CAFFBF', '#9BF6FF', '#A0C4FF', '#BDB2FF', '#FFC6FF'
        ];
        const shuffledColors = [...pastelColors].sort(() => 0.5 - Math.random());

        Array.from(numbers).sort((a, b) => a - b).forEach((number, index) => {
            const el = document.createElement('div');
            el.className = 'number';
            el.textContent = number;
            el.style.backgroundColor = shuffledColors[index % shuffledColors.length];
            el.style.animationDelay = `${index * 0.1}s`;
            numbersContainer.appendChild(el);
        });
    }
}

customElements.define('lotto-generator', LottoGenerator);
