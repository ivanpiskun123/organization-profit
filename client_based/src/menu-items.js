const menuItems = {
  items: [
    {
      id: 'forms-tables',
      title: 'Анализ прибыли',
      type: 'group',
      icon: 'icon-group',
      children: [
        {
          id: 'forms',
          title: 'Present-отчёт',
          type: 'item',
          url: '/charts/present',
          icon: 'feather icon-home ',
        }
      ]
    },
    {
      id: 'navigation',
      title: 'Степень важности ресурсов',
      type: 'group',
      icon: 'feather icon-server',
      children: [
        {
          id: 'breadcrumb',
          title: 'XYZ-анализ ресурсов',
          type: 'item',
          url: '/charts/xyz',
          icon: 'feather icon-menu',
        },
        {
          id: 'breadcrumb',
          title: 'Отчёт групп продуктов',
          type: 'item',
          url: '/charts/groups',
          icon: 'feather icon-menu',
        },
        {
          id: 'breadcrumb',
          title: 'Отчёт исходных ресурсов',
          type: 'item',
          url: '/charts/consumables',
          icon: 'feather icon-menu',
        },
      ]
    },
    {
      id: 'ui-element',
      title: 'Анализ динамики продаж',
      type: 'group',
      icon: 'feather icon-file-text',
      children: [
        {
          id: 'time',
          title: 'Анализ по датам',
          type: 'collapse',
          icon: 'feather icon-calendar',
          children: [
            {
              id: 'button',
              title: 'Выполнение продаж',
              type: 'item',
              url: '/charts/execute'
            },
            {
              id: 'badges',
              title: 'Продажи-Расходы',
              type: 'item',
              url: '/charts/index'
            },
            {
              id: 'tabs-pills',
              title: 'Сезонность',
              type: 'item',
              url: '/charts/season'
            }
          ]
        }
      ]
    }
    ,
    {
      id: 'ui-element',
      title: 'Анализ основных величин',
      type: 'group',
      icon: 'feather icon-file-text',
      children: [
        {
          id: 'basic',
          title: 'Специальные величины',
          type: 'collapse',
          icon: 'feather icon-pie-chart',
          children: [
            {
              id: 'pagination',
              title: 'Формы оплаты',
              type: 'item',
              url: '/charts/payment_forms'
            },
            {
              id: 'collapse',
              title: 'Формы торговли',
              type: 'item',
              url: '/charts/trade_forms'
            },
          ]
        }
      ]
    }
      ]
};

export default menuItems;




