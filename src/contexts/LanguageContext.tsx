import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "ka" | "ru";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.cottages": "Our Cottages",
    "nav.gallery": "Gallery",
    "nav.contact": "Contact Us",
    
    // Home Page
    "home.hero.title": "Your Summer Home by the Black Sand",
    "home.hero.subtitle": "Cozy cottages steps away from Ureki's magnetic beaches",
    "home.hero.cta": "Book Your Stay",
    
    "home.info.cottages.title": "7 Cozy Cottages",
    "home.info.cottages.desc": "Perfect for families, couples, and groups",
    "home.info.season.title": "Summer Season",
    "home.info.season.desc": "Available June through August",
    "home.info.location.title": "Prime Location",
    "home.info.location.desc": "Steps away from the black sand beach",
    
    "home.about.title": "Welcome to Ureki Beach",
    "home.about.p1": "Our family-run business offers 7 charming cottages in the heart of Ureki, Georgia's famous magnetic black sand beach resort. Each cottage is designed for comfort and relaxation, making your summer vacation unforgettable.",
    "home.about.p2": "Whether you're seeking a peaceful retreat or a fun-filled family vacation, our cottages provide the perfect home base for exploring the unique beauty of Ureki's healing black sand beaches.",
    "home.about.cta": "Explore Our Cottages",
    
    "home.cta.title": "Ready to Experience Ureki?",
    "home.cta.subtitle": "Check our availability and book your perfect summer getaway today",
    "home.cta.book": "Book Your Stay",
    "home.cta.contact": "Contact Us",
    
    "home.reviews.title": "What Our Guests Say",
    "home.reviews.rating": "Rating on Booking.com",
    "home.reviews.testimonial1.text": "Amazing location right by the beach! The cottage was clean, comfortable and had everything we needed. The magnetic black sand beach is truly special.",
    "home.reviews.testimonial1.author": "Sarah M.",
    "home.reviews.testimonial1.location": "Germany",
    "home.reviews.testimonial2.text": "Perfect family vacation! The kids loved the beach and the cottage was spacious enough for all of us. Great hospitality from the owners.",
    "home.reviews.testimonial2.author": "Giorgi K.",
    "home.reviews.testimonial2.location": "Tbilisi, Georgia",
    "home.reviews.testimonial3.text": "Best summer holiday we've had! The peaceful atmosphere and the healing properties of the beach made our stay unforgettable.",
    "home.reviews.testimonial3.author": "Elena P.",
    "home.reviews.testimonial3.location": "Russia",
    
    // Cottages Page
    "cottages.title": "Our Cottages",
    "cottages.subtitle": "We offer 7 identical, comfortable cottages perfect for your summer stay",
    "cottages.card.title": "Summer Cottage",
    "cottages.card.desc": "Each of our 7 cottages offers the same high-quality experience with identical amenities and comfort",
    "cottages.guests": "Up to 4 guests",
    "cottages.bedrooms": "2 Bedrooms",
    "cottages.description": "Each cottage is designed for comfort and relaxation, providing everything you need for a perfect summer vacation. All cottages are well-maintained and offer the same amenities, ensuring every guest enjoys the same wonderful experience. Features include wood-paneled interiors, comfortable bedding, a fully equipped kitchen, and a modern bathroom with shower.",
    "cottages.amenities.title": "Amenities & Features",
    "cottages.amenity.beds": "Comfortable Beds",
    "cottages.amenity.beds.desc": "Quality bedding for restful sleep",
    "cottages.amenity.kitchen": "Full Kitchen",
    "cottages.amenity.kitchen.desc": "Equipped with all essentials",
    "cottages.amenity.bathroom": "Private Bathroom",
    "cottages.amenity.bathroom.desc": "Clean and modern facilities",
    "cottages.amenity.ac": "Air Conditioning",
    "cottages.amenity.ac.desc": "Stay cool during summer",
    "cottages.amenity.wifi": "Wi-Fi Access",
    "cottages.amenity.wifi.desc": "Stay connected",
    "cottages.amenity.living": "Living Space",
    "cottages.amenity.living.desc": "Cozy common areas",
    "cottages.cta.title": "Ready to Book?",
    "cottages.cta.subtitle": "All 7 cottages offer the same great experience. Contact us to check availability!",
    
    // Gallery Page
    "gallery.title": "Gallery",
    "gallery.subtitle": "Take a visual tour of our property and the beautiful Ureki beach",
    "gallery.instagram.title": "See More on Instagram",
    "gallery.instagram.desc": "Follow us for daily updates, guest photos, and beach life moments",
    
    // Contact Page
    "contact.title": "Contact Us",
    "contact.subtitle": "Ready to book your summer getaway? Get in touch with us!",
    "contact.form.title": "Send us a message",
    "contact.form.desc": "Fill out the form and we'll respond within 24 hours",
    "contact.form.name": "Name",
    "contact.form.phone": "Phone",
    "contact.form.email": "Email",
    "contact.form.checkin": "Check-in",
    "contact.form.checkout": "Check-out",
    "contact.form.message": "Message (Optional)",
    "contact.form.message.placeholder": "Tell us about your plans...",
    "contact.form.submit": "Send Message",
    "contact.call": "Call Us",
    "contact.whatsapp": "Message on WhatsApp",
    "contact.email": "Email Us",
    "contact.visit": "Visit Us",
    
    // Footer
    "footer.about": "Your summer home by the magnetic black sand beaches of Ureki, Georgia.",
    "footer.contact": "Contact",
    "footer.follow": "Follow Us",
    "footer.copyright": "All rights reserved.",
  },
  ka: {
    // Navigation
    "nav.home": "მთავარი",
    "nav.cottages": "ჩვენი კოტეჯები",
    "nav.gallery": "გალერეა",
    "nav.contact": "კონტაქტი",
    
    // Home Page
    "home.hero.title": "თქვენი ზაფხულის სახლი შავი ქვიშის პლაჟზე",
    "home.hero.subtitle": "მყუდრო კოტეჯები ურეკის მაგნიტური პლაჟის გვერდით",
    "home.hero.cta": "დაჯავშნეთ ახლავე",
    
    "home.info.cottages.title": "7 მყუდრო კოტეჯი",
    "home.info.cottages.desc": "შესანიშნავია ოჯახებისთვის, წყვილებისთვის და ჯგუფებისთვის",
    "home.info.season.title": "ზაფხულის სეზონი",
    "home.info.season.desc": "ხელმისაწვდომია ივნისიდან აგვისტომდე",
    "home.info.location.title": "პრემიუმ ლოკაცია",
    "home.info.location.desc": "რამდენიმე ნაბიჯით შავი ქვიშის პლაჟიდან",
    
    "home.about.title": "კეთილი იყოს თქვენი მობრძანება ურეკის პლაჟზე",
    "home.about.p1": "ჩვენი ოჯახური ბიზნესი გთავაზობთ 7 მომხიბვლელ კოტეჯს ურეკის, საქართველოს ცნობილი მაგნიტური შავი ქვიშის პლაჟის კურორტის გულში. თითოეული კოტეჯი შექმნილია კომფორტისა და მოსვენებისთვის, რაც თქვენს ზაფხულის არდადეგებს დაუვიწყარს გახდის.",
    "home.about.p2": "იქნება ეს მშვიდი დასვენება თუ ოჯახური გართობა, ჩვენი კოტეჯები იდეალურ ბაზას იძლევა ურეკის შავი ქვიშის პლაჟების უნიკალური სილამაზის შესასწავლად.",
    "home.about.cta": "გაეცანით ჩვენს კოტეჯებს",
    
    "home.cta.title": "მზად ხართ ურეკის გასაცნობად?",
    "home.cta.subtitle": "შეამოწმეთ ხელმისაწვდომობა და დაჯავშნეთ თქვენი იდეალური ზაფხული დღესვე",
    "home.cta.book": "დაჯავშნეთ ახლავე",
    "home.cta.contact": "დაგვიკავშირდით",
    
    "home.reviews.title": "რას ამბობენ ჩვენი სტუმრები",
    "home.reviews.rating": "რეიტინგი Booking.com-ზე",
    "home.reviews.testimonial1.text": "შესანიშნავი ლოკაცია პლაჟთან! კოტეჯი სუფთა, კომფორტული და ყველაფერი იყო რაც გვჭირდებოდა. მაგნიტური შავი ქვიშის პლაჟი ნამდვილად განსაკუთრებულია.",
    "home.reviews.testimonial1.author": "სარა მ.",
    "home.reviews.testimonial1.location": "გერმანია",
    "home.reviews.testimonial2.text": "შესანიშნავი ოჯახური დასვენება! ბავშვებს ძალიან მოეწონათ პლაჟი და კოტეჯი საკმარისად ფართო იყო ჩვენი ოჯახისთვის. მშვენიერი მასპინძლობა მესაკუთრეებისგან.",
    "home.reviews.testimonial2.author": "გიორგი კ.",
    "home.reviews.testimonial2.location": "თბილისი, საქართველო",
    "home.reviews.testimonial3.text": "საუკეთესო ზაფხულის არდადეგები რაც გვქონია! მშვიდი ატმოსფერო და პლაჟის სამკურნალო თვისებები ჩვენს ყოფნას დაუვიწყარს ხდიდა.",
    "home.reviews.testimonial3.author": "ელენა პ.",
    "home.reviews.testimonial3.location": "რუსეთი",
    
    // Cottages Page
    "cottages.title": "ჩვენი კოტეჯები",
    "cottages.subtitle": "ჩვენ გთავაზობთ 7 იდენტურ, კომფორტულ კოტეჯს თქვენი ზაფხულის დასვენებისთვის",
    "cottages.card.title": "ზაფხულის კოტეჯი",
    "cottages.card.desc": "ჩვენი 7 კოტეჯიდან თითოეული გთავაზობთ მაღალი ხარისხის გამოცდილებას იდენტური პირობებითა და კომფორტით",
    "cottages.guests": "4 სტუმრამდე",
    "cottages.bedrooms": "2 საძინებელი",
    "cottages.description": "თითოეული კოტეჯი შექმნილია კომფორტისა და მოსვენებისთვის, უზრუნველყოფს ყველაფერს რაც გჭირდებათ შესანიშნავი ზაფხულისთვის. ყველა კოტეჯი კარგად არის მოვლილი და გთავაზობთ იდენტურ პირობებს. მოიცავს ხის პანელებიან ინტერიერს, კომფორტულ საწოლებს, სრულად აღჭურვილ სამზარეულოს და თანამედროვე სააბაზანოს.",
    "cottages.amenities.title": "პირობები და მომსახურება",
    "cottages.amenity.beds": "კომფორტული საწოლები",
    "cottages.amenity.beds.desc": "ხარისხიანი საწოლი მშვიდი ძილისთვის",
    "cottages.amenity.kitchen": "სრული სამზარეულო",
    "cottages.amenity.kitchen.desc": "აღჭურვილი ყველა საჭირო ნივთით",
    "cottages.amenity.bathroom": "პირადი სააბაზანო",
    "cottages.amenity.bathroom.desc": "სუფთა და თანამედროვე",
    "cottages.amenity.ac": "კონდიციონერი",
    "cottages.amenity.ac.desc": "გაგრილება ზაფხულში",
    "cottages.amenity.wifi": "Wi-Fi",
    "cottages.amenity.wifi.desc": "დარჩით კავშირზე",
    "cottages.amenity.living": "საცხოვრებელი სივრცე",
    "cottages.amenity.living.desc": "მყუდრო საერთო ადგილები",
    "cottages.cta.title": "მზად ხართ დასაჯავშნად?",
    "cottages.cta.subtitle": "ყველა 7 კოტეჯი გთავაზობთ შესანიშნავ გამოცდილებას. დაგვიკავშირდით ხელმისაწვდომობის შესამოწმებლად!",
    
    // Gallery Page
    "gallery.title": "გალერეა",
    "gallery.subtitle": "ვიზუალური ტური ჩვენი ტერიტორიითა და ურეკის ლამაზი პლაჟით",
    "gallery.instagram.title": "მეტი ინსტაგრამზე",
    "gallery.instagram.desc": "გამოგვყევით ყოველდღიური განახლებებისთვის, სტუმრების ფოტოებისა და პლაჟის ცხოვრებისთვის",
    
    // Contact Page
    "contact.title": "კონტაქტი",
    "contact.subtitle": "მზად ხართ დაჯავშნოთ თქვენი ზაფხული? დაგვიკავშირდით!",
    "contact.form.title": "გამოგვიგზავნეთ შეტყობინება",
    "contact.form.desc": "შეავსეთ ფორმა და ჩვენ გიპასუხებთ 24 საათში",
    "contact.form.name": "სახელი",
    "contact.form.phone": "ტელეფონი",
    "contact.form.email": "ელ-ფოსტა",
    "contact.form.checkin": "დაბინავება",
    "contact.form.checkout": "გამობინავება",
    "contact.form.message": "შეტყობინება (არასავალდებულო)",
    "contact.form.message.placeholder": "მოგვიყევით თქვენი გეგმების შესახებ...",
    "contact.form.submit": "გაგზავნა",
    "contact.call": "დარეკეთ ჩვენ",
    "contact.whatsapp": "დაწერეთ WhatsApp-ზე",
    "contact.email": "გამოგვიგზავნეთ ელ-ფოსტა",
    "contact.visit": "მოგვინახულეთ",
    
    // Footer
    "footer.about": "თქვენი ზაფხულის სახლი ურეკის მაგნიტური შავი ქვიშის პლაჟზე, საქართველო.",
    "footer.contact": "კონტაქტი",
    "footer.follow": "გამოგვყევით",
    "footer.copyright": "ყველა უფლება დაცულია.",
  },
  ru: {
    // Navigation
    "nav.home": "Главная",
    "nav.cottages": "Наши Коттеджи",
    "nav.gallery": "Галерея",
    "nav.contact": "Контакты",
    
    // Home Page
    "home.hero.title": "Ваш летний дом у черного песка",
    "home.hero.subtitle": "Уютные коттеджи в нескольких шагах от магнитных пляжей Уреки",
    "home.hero.cta": "Забронировать",
    
    "home.info.cottages.title": "7 уютных коттеджей",
    "home.info.cottages.desc": "Идеально для семей, пар и групп",
    "home.info.season.title": "Летний сезон",
    "home.info.season.desc": "Доступно с июня по август",
    "home.info.location.title": "Отличное расположение",
    "home.info.location.desc": "В нескольких шагах от пляжа с черным песком",
    
    "home.about.title": "Добро пожаловать в Уреки Бич",
    "home.about.p1": "Наш семейный бизнес предлагает 7 очаровательных коттеджей в самом сердце Уреки, знаменитого грузинского курорта с магнитным черным песком. Каждый коттедж создан для комфорта и отдыха, делая ваш летний отпуск незабываемым.",
    "home.about.p2": "Ищете ли вы спокойный отдых или веселый семейный отпуск, наши коттеджи обеспечивают идеальную базу для изучения уникальной красоты целебных пляжей Уреки.",
    "home.about.cta": "Ознакомьтесь с нашими коттеджами",
    
    "home.cta.title": "Готовы испытать Уреки?",
    "home.cta.subtitle": "Проверьте наличие мест и забронируйте свой идеальный летний отдых сегодня",
    "home.cta.book": "Забронировать",
    "home.cta.contact": "Связаться с нами",
    
    "home.reviews.title": "Отзывы наших гостей",
    "home.reviews.rating": "Рейтинг на Booking.com",
    "home.reviews.testimonial1.text": "Потрясающее расположение прямо у пляжа! Коттедж был чистым, комфортным и имел все необходимое. Пляж с магнитным черным песком действительно особенный.",
    "home.reviews.testimonial1.author": "Сара М.",
    "home.reviews.testimonial1.location": "Германия",
    "home.reviews.testimonial2.text": "Идеальный семейный отпуск! Детям очень понравился пляж, а коттедж был достаточно просторным для всех нас. Отличное гостеприимство от владельцев.",
    "home.reviews.testimonial2.author": "Гиорги К.",
    "home.reviews.testimonial2.location": "Тбилиси, Грузия",
    "home.reviews.testimonial3.text": "Лучший летний отдых, который у нас был! Спокойная атмосфера и целебные свойства пляжа сделали наше пребывание незабываемым.",
    "home.reviews.testimonial3.author": "Елена П.",
    "home.reviews.testimonial3.location": "Россия",
    
    // Cottages Page
    "cottages.title": "Наши коттеджи",
    "cottages.subtitle": "Мы предлагаем 7 одинаковых, комфортабельных коттеджей для вашего летнего отдыха",
    "cottages.card.title": "Летний коттедж",
    "cottages.card.desc": "Каждый из наших 7 коттеджей предлагает одинаковые высококачественные условия и комфорт",
    "cottages.guests": "До 4 гостей",
    "cottages.bedrooms": "2 спальни",
    "cottages.description": "Каждый коттедж создан для комфорта и отдыха, предоставляя все необходимое для идеального летнего отпуска. Все коттеджи хорошо ухожены и предлагают одинаковые удобства. Включают деревянную обшивку, удобные кровати, полностью оборудованную кухню и современную ванную комнату с душем.",
    "cottages.amenities.title": "Удобства и услуги",
    "cottages.amenity.beds": "Удобные кровати",
    "cottages.amenity.beds.desc": "Качественное постельное белье для спокойного сна",
    "cottages.amenity.kitchen": "Полная кухня",
    "cottages.amenity.kitchen.desc": "Оборудована всем необходимым",
    "cottages.amenity.bathroom": "Личная ванная",
    "cottages.amenity.bathroom.desc": "Чистая и современная",
    "cottages.amenity.ac": "Кондиционер",
    "cottages.amenity.ac.desc": "Прохлада летом",
    "cottages.amenity.wifi": "Wi-Fi",
    "cottages.amenity.wifi.desc": "Оставайтесь на связи",
    "cottages.amenity.living": "Жилое пространство",
    "cottages.amenity.living.desc": "Уютные общие зоны",
    "cottages.cta.title": "Готовы забронировать?",
    "cottages.cta.subtitle": "Все 7 коттеджей предлагают отличный отдых. Свяжитесь с нами для проверки наличия!",
    
    // Gallery Page
    "gallery.title": "Галерея",
    "gallery.subtitle": "Визуальный тур по нашей территории и красивому пляжу Уреки",
    "gallery.instagram.title": "Больше в Instagram",
    "gallery.instagram.desc": "Подписывайтесь на ежедневные обновления, фотографии гостей и пляжную жизнь",
    
    // Contact Page
    "contact.title": "Контакты",
    "contact.subtitle": "Готовы забронировать летний отдых? Свяжитесь с нами!",
    "contact.form.title": "Отправьте нам сообщение",
    "contact.form.desc": "Заполните форму, и мы ответим в течение 24 часов",
    "contact.form.name": "Имя",
    "contact.form.phone": "Телефон",
    "contact.form.email": "Электронная почта",
    "contact.form.checkin": "Заезд",
    "contact.form.checkout": "Выезд",
    "contact.form.message": "Сообщение (необязательно)",
    "contact.form.message.placeholder": "Расскажите нам о ваших планах...",
    "contact.form.submit": "Отправить",
    "contact.call": "Позвоните нам",
    "contact.whatsapp": "Напишите в WhatsApp",
    "contact.email": "Напишите нам",
    "contact.visit": "Посетите нас",
    
    // Footer
    "footer.about": "Ваш летний дом у магнитных пляжей с черным песком Уреки, Грузия.",
    "footer.contact": "Контакты",
    "footer.follow": "Подписывайтесь",
    "footer.copyright": "Все права защищены.",
  },
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
};
