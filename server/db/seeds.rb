Role.create(
  [
    {name: "Analyst"},
    {name: "S&P manager"}
  ]
)

u = Role.find_by(name: "Analyst")
a = Role.find_by(name: "S&P manager")

User.create([
{
  name: 'Юрий Иванов',
  email: 'admin1@gmail.com',
  password: 'admin123',
  password_confirmation: 'admin123', jti: SecureRandom.uuid,
  role: a
},
{
  name: 'Александра Левко',
  email: 'admin2@gmail.com',
  password: 'admin123',
  password_confirmation: 'admin123', jti: SecureRandom.uuid,
  role: a

},
{
  name: 'Юлия Змушко',
  email: 'admin3@gmail.com',
  password: 'admin123',
  password_confirmation: 'admin123', jti: SecureRandom.uuid,
  role: a
},
{
  name: 'Евгений Степанов',
  email: 'user1@gmail.com',
  password: 'admin123',
  password_confirmation: 'admin123', jti: SecureRandom.uuid,
  role: u
},
{
  name: 'Татьяна Кулага',
  email: 'user2@gmail.com',
  password: 'admin123',
  password_confirmation: 'admin123', jti: SecureRandom.uuid,
  role: u
},
{
  name: 'Мирослава Рябова',
    email: 'user3@gmail.com',
    password: 'admin123',
    password_confirmation: 'admin123', jti: SecureRandom.uuid,
    role: u
},
])

ProductGroup.create([
{
  name: 'Web ПО'
},
{
  name: 'Игры & Развлечения'
},
{
  name: 'Бановское ПО'
},
{
  name: 'Микроэлектроника'
},
{
  name: 'Прочее'
}
])

Product.create([
 {
   name: 'Backend онлайн-казино',
   product_group_id: 1,
   price: 80_000
 },
 {
   name: 'Конструктор сайт-визиток',
   product_group_id: 1,
   price: 110_000
 },
 {
   name: 'Прокси-сервер брокеров',
   product_group_id: 1,
   price: 23_000
 },
 {
   name: 'Веб-сайт CRM УО',
   product_group_id: 1,
   price: 255_000
 },


 {
   name: 'Шахматный онлайн-движок',
   product_group_id: 2,
   price: 100_000
 },
 {
   name: 'Пакет DT карточных игр',
   product_group_id: 2,
   price: 33_000
 },
 {
   name: 'Мобильный симулятор голосов',
   product_group_id: 2,
   price: 80_000
 },
 {
   name: 'Мобильный VR-вывод',
   product_group_id: 2,
   price: 77_000
 },


 {
   name: 'Платежный шлюз',
   product_group_id: 3,
   price: 67_000
 },
 {
   name: 'Крипто-посредник CRM',
   product_group_id: 3,
   price: 47_000
 },
 {
   name: 'Сервер банковской СУБД',
   product_group_id: 3,
   price: 190_000
 },

 {
   name: 'Чип 233FP 64-ядерный',
   product_group_id: 4,
   price: 200_000
 },
 {
   name: 'Микрокамера 80DPT-1',
   product_group_id: 4,
   price: 30_000
 },
 {
   name: 'Программатор CF-34',
   product_group_id: 4,
   price: 150_000
 },


 {
   name: 'Контейнеризатор',
   product_group_id: 5,
   price: 211_000
 },
 {
   name: 'Оркестратор микро-ОС',
   product_group_id: 5,
   price: 146_000
 },
 {
   name: 'Система трекинга времени',
   product_group_id: 5,
   price: 60_000
 },
])

Consumable.create!([
 {
   name: "Человеко-час: инженер ПО Junior",
   price: 10
 },
 {
   name: "Человеко-час: инженер ПО Middle",
   price: 25
 },
 {
   name: "Человеко-час: инженер ПО Senior",
   price: 55
 },
 {
   name: "Человеко-час: Архитектор ПО",
   price: 80
 },
 {
   name: "Человеко-час: Embedded-инженер",
   price: 45
 },
 {
   name: "Человеко-час: Dev-Ops",
   price: 35
 },
 {
   name: "Человеко-час: QA",
   price: 25
 },
 {
   name: "Человеко-час: PM/PO/SM",
   price: 20
 },
 {
   name: "Годичная лицензия JetBrains",
   price: 20
 },
 {
   name: "Годичная лицензия Eclipse",
   price: 30
 },
 {
   name: "Годичная лицензия Docker",
   price: 60
 },
 {
   name: "Ноутбук Mac 2 Air Pro (2 года)",
   price: 45
 },
 {
   name: "Ноутбук Lenovo 342-12 (2 года)",
   price: 45
 },
 {
   name: "Набор Nordic-микро-ПК",
   price: 150
 },
 {
   name: "Сервер Zenon-345GB (1 год)",
   price: 250
 },
 {
   name: "Прочее",
   price: 150
 },
   ])


# creating of months (2020, 2021, 2022)
years = ['2020', '2021', '2022', '2023']

sales_plans = [
  [130000, 140000, 135000, 120000, 135000, 145000, 150000, 153000, 156000, 159000, 162000, 164000],
  [165000, 166000, 169000, 172000, 172000, 172000, 173000, 175000, 177000, 179000, 181000, 181000],
  [182000, 184000, 185000, 189000, 189000, 189000, 191000, 191500, 192000, 196000, 198000, 200000],
  [192000, 194000, 194000, 194000, 200000, 203000, 220000, 220500, 221000, 221600, 224000, 245000]
]

years.each_with_index do |year, year_idx|
  (0..11).each do |i|
    Month.create({ date: "01-"+(i+1).to_s+"-"+year, sales_plan: 3*sales_plans[year_idx][i]})
  end
end


# TODO: to get all months until current and create (rand count 3..n) purchases & sales for it
# TODO: changing created_at to rand (0..current_day if month is current, else - 28)



Month.order(:date).each_with_index do |month, month_id|

  break if month.date.beginning_of_month == Date.today.beginning_of_month

  rand(15..30).times do
    cs = Consumable.order('random()').take
    amount = rand(160..220)
    p = Purchase.create!({
         consumable: cs,
         amount: amount,
         month: month,
         total_sum: cs.price * amount
       })
    p.created_at = (month.date.beginning_of_month..month.date.end_of_month).first + rand(0..28)
    p.save
  end

  rand(1..3).times do
    pd = Product.order('random()').take
    amount = rand(1..4)
    s = Sale.create!({
           product: pd,
           amount: amount,
           month: month,
           total_sum: pd.price * amount,
           payment_method: [true, false].sample,
           trade_form: [true, false].sample,
         })
    s.created_at = (month.date.beginning_of_month..month.date.end_of_month).first + rand(0..28)
    s.save
  end
end

AdminUser.create!(email: 'admin1@gmail.com', password: 'admin123', password_confirmation: 'admin123') if Rails.env.development?
