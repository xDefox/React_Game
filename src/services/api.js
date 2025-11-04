class ApiService {
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Авторизация
  async login(username, password) {
    await this.delay(1000);
    
    if (username === 'admin' && password === 'admin') {
      return { username, role: 'admin' };
    } else if (username === 'user' && password === 'user') {
      return { username, role: 'user' };
    } else {
      throw new Error('Неверное имя пользователя или пароль');
    }
  }

  async getCards() {
    await this.delay(500);
    
    return [
      {
        id: '1',
        title: 'Пример задачи',
        description: 'Это пример карточки с описанием задачи или сущности',
        tags: ['React', 'JavaScript'],
        status: 'active',
        date: '2024-01-15'
      },
      {
        id: '2',
        title: 'Вторая задача',
        description: 'Еще одна карточка для демонстрации',
        tags: ['CSS', 'UI'],
        status: 'paused',
        date: '2024-01-14'
      }
    ];
  }

  async addCard(cardData) {
    await this.delay(300);
    
    return {
      ...cardData,
      id: Date.now().toString(),
      date: new Date().toISOString()
    };
  }

  async deleteCard(cardId) {
    await this.delay(300);
    return cardId;
  }
}

export default new ApiService();