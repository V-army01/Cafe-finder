db = db.getSiblingDB('cafedb');
db.cafes.drop();

db.cafes.insertMany([
  {
    name: "Brew & Beans", area: "malviya nagar", city: "Jaipur",
    address: "12, MI Road, Malviya Nagar, Jaipur",
    rating: 4.5, priceForTwo: 350, distanceKm: 0.8,
    timings: "8:00 AM - 10:00 PM", imageUrl: "",
    tags: ["wifi", "outdoor", "quiet"],
    menu: [{item:"Cappuccino",price:120},{item:"Cold Brew",price:150},{item:"Avocado Toast",price:220},{item:"Croissant",price:90}],
    todaySpecial: {name:"Honey Lavender Latte",description:"Espresso with house-made lavender syrup, steamed oat milk and a drizzle of wildflower honey.",price:165,originalPrice:210,imageUrl:""}
  },
  {
    name: "The Patio Cafe", area: "malviya nagar", city: "Jaipur",
    address: "8B, Tonk Road, Malviya Nagar, Jaipur",
    rating: 4.2, priceForTwo: 500, distanceKm: 1.4,
    timings: "9:00 AM - 11:00 PM", imageUrl: "",
    tags: ["pet-friendly", "live music"],
    menu: [{item:"Latte",price:140},{item:"Waffles",price:280},{item:"Eggs Benedict",price:320},{item:"Juice",price:100}],
    todaySpecial: {name:"Peri Peri Shakshuka",description:"Baked eggs in a smoky peri-peri tomato sauce, served with toasted sourdough soldiers.",price:280,originalPrice:340,imageUrl:""}
  },
  {
    name: "Kettle & Clove", area: "malviya nagar", city: "Jaipur",
    address: "23, New Colony, Malviya Nagar, Jaipur",
    rating: 3.9, priceForTwo: 250, distanceKm: 2.1,
    timings: "7:30 AM - 9:30 PM", imageUrl: "",
    tags: ["budget-friendly", "takeaway"],
    menu: [{item:"Masala Chai",price:40},{item:"Filter Coffee",price:60},{item:"Samosa",price:30},{item:"Sandwich",price:90}],
    todaySpecial: {name:"Saffron Kahwa",description:"Traditional Kashmiri green tea brewed with saffron, cinnamon, cardamom and crushed almonds.",price:65,originalPrice:90,imageUrl:""}
  },
  {
    name: "Aroha Roastery", area: "c-scheme", city: "Jaipur",
    address: "45, Prithviraj Road, C-Scheme, Jaipur",
    rating: 4.7, priceForTwo: 700, distanceKm: 0.5,
    timings: "10:00 AM - 10:00 PM", imageUrl: "",
    tags: ["specialty coffee", "books", "cosy"],
    menu: [{item:"Pour Over",price:220},{item:"Flat White",price:180},{item:"Banana Bread",price:160},{item:"Quiche",price:280}],
    todaySpecial: {name:"Single Origin Pour Over",description:"Today's lot: Ethiopian Yirgacheffe - bright blueberry and jasmine notes, light roast, 18g dose.",price:240,originalPrice:280,imageUrl:""}
  },
  {
    name: "Sun & Sip", area: "c-scheme", city: "Jaipur",
    address: "7, Nehru Place, C-Scheme, Jaipur",
    rating: 4.0, priceForTwo: 400, distanceKm: 1.2,
    timings: "8:00 AM - 8:00 PM", imageUrl: "",
    tags: ["rooftop", "wifi"],
    menu: [{item:"Iced Americano",price:130},{item:"Smoothie Bowl",price:250},{item:"Pancakes",price:200},{item:"Cold Sandwich",price:170}],
    todaySpecial: {name:"Mango Chilli Cooler",description:"Fresh Alphonso mango blended with lime juice, a pinch of Kashmiri chilli and sparkling water.",price:160,originalPrice:200,imageUrl:""}
  },
  {
    name: "The Bean Counter", area: "vaishali nagar", city: "Jaipur",
    address: "12A, Sector 5, Vaishali Nagar, Jaipur",
    rating: 4.3, priceForTwo: 450, distanceKm: 3.5,
    timings: "9:00 AM - 10:00 PM", imageUrl: "",
    tags: ["wifi", "workspace", "cosy"],
    menu: [{item:"Americano",price:110},{item:"Matcha Latte",price:160},{item:"Club Sandwich",price:240},{item:"Brownie",price:120}],
    todaySpecial: {name:"Truffle Mushroom Bruschetta",description:"Sourdough toast topped with sauteed wild mushrooms, truffle oil, fresh thyme and shaved parmesan.",price:220,originalPrice:270,imageUrl:""}
  },
  {
    name: "Gully Cafe", area: "vaishali nagar", city: "Jaipur",
    address: "33, Sector 3, Vaishali Nagar, Jaipur",
    rating: 3.7, priceForTwo: 180, distanceKm: 4.0,
    timings: "7:00 AM - 9:00 PM", imageUrl: "",
    tags: ["budget-friendly", "breakfast"],
    menu: [{item:"Chai",price:25},{item:"Bread Omelette",price:60},{item:"Poha",price:45},{item:"Upma",price:50}],
    todaySpecial: {name:"Masala Oats Chilla",description:"Savoury oat crepes spiced with cumin, green chilli and coriander, served with mint chutney.",price:70,originalPrice:95,imageUrl:""}
  },
  {
    name: "Altitude", area: "bani park", city: "Jaipur",
    address: "2, Ashok Marg, Bani Park, Jaipur",
    rating: 4.6, priceForTwo: 600, distanceKm: 1.8,
    timings: "11:00 AM - 11:00 PM", imageUrl: "",
    tags: ["rooftop", "cocktails", "sunset views"],
    menu: [{item:"Espresso Martini",price:320},{item:"Cold Brew Tonic",price:180},{item:"Tapas",price:350},{item:"Tiramisu",price:220}],
    todaySpecial: {name:"Smoked Chocolate Fondant",description:"Warm dark chocolate fondant with a liquid centre, smoked at the table, served with sea-salt ice cream.",price:290,originalPrice:360,imageUrl:""}
  }
]);

print("Seeded " + db.cafes.countDocuments() + " cafes into cafedb.cafes");
