const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./database/models/Product');

dotenv.config();

const products = [
    {
        name: 'Aspirin 300mg',
        price: 22,
        category: 'medicines',
        manufacturer: 'Mkt: Asoj Soft Caps Pvt Ltd',
        image: 'pictures/Aspirin.png'
    },
    {
        name: 'Paracetamol 500mg',
        price: 350,
        category: 'medicines',
        manufacturer: 'Mkt: Lyka Labs',
        image: 'pictures/Paracitamol.png'
    },
    {
        name: 'Volini Spray 100gm',
        price: 373,
        category: 'medicines',
        manufacturer: 'Mkt: Sun Pharmaceutical',
        image: 'pictures/voleni 100.png'
    },
    {
        name: 'Vicks Vaporub 100gm',
        price: 340,
        category: 'medicines',
        manufacturer: 'Mkt: Procter-gamble-hygiene limited',
        image: 'pictures/Vicks veporub.png'
    },
    {
        name: 'Nise 100 Tablet 15\'s',
        price: 118,
        category: 'medicines',
        manufacturer: 'Mkt: Dr.Reddy\'s',
        image: 'pictures/Nise 100 Tablet 15\'s.png'
    },
    {
        name: 'Lanol ER Tablet',
        price: 20,
        category: 'medicines',
        manufacturer: 'Mkt: Methon Healthcare',
        image: 'pictures/Lanol ER Tablet.png'
    },
    {
        name: 'Carbimazol Tablets I.P. Neo Mercazole',
        price: 250,
        category: 'medicines',
        manufacturer: 'Mkt: Abbott',
        image: 'pictures/thyroid.avif'
    },
    {
        name: 'Allen Wormicid Tablet',
        price: 175,
        category: 'medicines',
        manufacturer: 'Mkt: ALLEN',
        image: 'pictures/Allen Wormicid Tablet.png'
    },
    {
        name: 'Gelusil',
        price: 23,
        category: 'medicines',
        manufacturer: 'Mkt: Pfizer',
        image: 'pictures/gelusil.webp'
    },
    {
        name: 'Dabur Honitus Syrup 4g',
        price: 125,
        category: 'medicines',
        manufacturer: 'Mkt: Dabur india limited',
        image: 'pictures/syrup.png'
    },
    {
        name: 'Mefkind-Spas Tablet 10\'s',
        price: 48,
        category: 'medicines',
        manufacturer: 'Mkt: LifeStar',
        image: 'pictures/Mefkind-Spas Tablet 10\'s.png'
    },
    {
        name: 'Lonitab 2.5 Tablet, 3 x 10 Tablets',
        price: 499,
        category: 'medicines',
        manufacturer: 'Mkt: Torrent Pharma',
        image: 'pictures/Lonitab 2.5 Tablet, 3 x 10 Tablets.png'
    },
    {
        name: 'Digital Thermometer',
        price: 300,
        category: 'healthcare',
        manufacturer: 'Mkt: Nureca Ltd.',
        image: 'pictures/thermometer.png'
    },
    {
        name: 'Froskie Electronic Digital Personal Weighing Scale',
        price: 600,
        category: 'healthcare',
        manufacturer: 'Mkt: Froskie(India)',
        image: 'pictures/Digital Weighing Scale.png'
    },
    {
        name: 'Comprehensive First Aid Kit',
        price: 14000,
        category: 'healthcare',
        manufacturer: 'Mkt: St.Johns First Aid Kits Pvt. Ltd.',
        image: 'pictures/first aid kit.png'
    },
    {
        name: 'boAt Lunar Vista',
        price: 2000,
        category: 'healthcare',
        manufacturer: 'Mkt: Bright Beginings Pvt. Ltd.',
        image: 'pictures/smart watch.png'
    },
    {
        name: 'Nebulizer CORE (QA-900)',
        price: 1800,
        category: 'healthcare',
        manufacturer: 'Mkt: Nureca Ltd.',
        image: 'pictures/Nebulizer CORE (QA-900).png'
    },
    {
        name: 'DR.MOREPEN GlucoOne Blood Glucose Monitor',
        price: 400,
        category: 'healthcare',
        manufacturer: 'Mkt: Morepen Laboratories Ltd.',
        image: 'pictures/Glucometer.png'
    },
    {
        name: 'Digital Automatic Blood Pressure Monitor',
        price: 1000,
        category: 'healthcare',
        manufacturer: 'Mkt: Shikon Healthcare',
        image: 'pictures/Blood Pressure Monitor.png'
    },
    {
        name: 'Omega 3 + multi vitamins',
        price: 1500,
        category: 'wellness',
        manufacturer: 'Mkt: Zinga Vita',
        image: 'pictures/omega 3.png'
    },
    {
        name: 'Muscleblaze Biozyme Performance Whey',
        price: 2250,
        category: 'wellness',
        manufacturer: 'Mkt: MUSCLEBLAZE',
        image: 'pictures/protein powder.png'
    },
    {
        name: 'Tulsi Green Tea',
        price: 850,
        category: 'wellness',
        manufacturer: 'Mkt: ORGANIC INDIA',
        image: 'pictures/herbal teas.png'
    },
    {
        name: 'Multivitamin & Minerals For Women',
        price: 1750,
        category: 'wellness',
        manufacturer: 'Mkt: Pure Nutrition TM.',
        image: 'pictures/multi vitamin.png'
    },
    {
        name: 'Mcronised Creatine Monohydrate',
        price: 1200,
        category: 'wellness',
        manufacturer: 'Mkt: Wellversed WELLCORE',
        image: 'pictures/CREATINE.png'
    },
    {
        name: 'Wow Immunity Booster Capsule',
        price: 1600,
        category: 'wellness',
        manufacturer: 'Mkt: WoW Life Science',
        image: 'pictures/immunity booster capsule.png'
    },
    {
        name: 'Mamaearth Shampoo',
        price: 350,
        category: 'personal-care',
        manufacturer: 'Mkt: Mamaearth TM',
        image: 'pictures/mamaearth.avif'
    },
    {
        name: 'DAY CREAM',
        price: 300,
        category: 'personal-care',
        manufacturer: 'Mkt: HOMEO CARE CLINIC',
        image: 'pictures/day cream.jpg'
    },
    {
        name: 'Joy Vitamin C',
        price: 250,
        category: 'personal-care',
        manufacturer: 'Mkt: JOY',
        image: 'pictures/joy.jpg'
    },
    {
        name: 'Glodent Toothpaste',
        price: 120,
        category: 'personal-care',
        manufacturer: 'Mkt: Glodent',
        image: 'pictures/glodent.avif'
    },
    {
        name: 'REVEL Smooth & Shine',
        price: 220,
        category: 'personal-care',
        manufacturer: 'Mkt: REVEL',
        image: 'pictures/revel.jpg'
    },
    {
        name: 'Pilgrim Smoothing Shampoo',
        price: 150,
        category: 'personal-care',
        manufacturer: 'Mkt: Pilgrim',
        image: 'pictures/pilgrim.webp'
    },
    {
        name: 'WOW Science Yuzu + Vitamin C',
        price: 700,
        category: 'personal-care',
        manufacturer: 'Mkt: WOW',
        image: 'pictures/WOW.webp'
    },
    {
        name: 'TRESemme Hair Fall Defense',
        price: 323,
        category: 'personal-care',
        manufacturer: 'Mkt: TRESemme',
        image: 'pictures/Tresemme.avif'
    },
    {
        name: 'Sensodyne Fresh Mint Toothpaste',
        price: 150,
        category: 'personal-care',
        manufacturer: 'Mkt: Sensodyne',
        image: 'pictures/sensodyne fresh mint toothpaste.avif'
    },
    {
        name: 'Spark Electric Toothbrush',
        price: 1400,
        category: 'personal-care',
        manufacturer: 'Mkt: Colesmith',
        image: 'pictures/eletric toothbrush.png'
    },
    {
        name: 'Oral-B Criss Cross Combo',
        price: 387,
        category: 'personal-care',
        manufacturer: 'Mkt: Oral-B',
        image: 'pictures/oral combo.png'
    },
    {
        name: 'Colgate Extra Clean',
        price: 28,
        category: 'personal-care',
        manufacturer: 'Mkt: Colgate',
        image: 'pictures/colgate tooth.webp'
    },
    {
        name: 'Oral-B Cavity Defense Toothbrush',
        price: 230,
        category: 'personal-care',
        manufacturer: 'Mkt: Oral-B',
        image: 'pictures/oral-b tooth.jpg'
    },
    {
        name: 'Oral-B Protect & Clean',
        price: 58,
        category: 'personal-care',
        manufacturer: 'Mkt: Oral-B',
        image: 'pictures/oral-b.png'
    },
    {
        name: 'Colgate Max Fresh',
        price: 37,
        category: 'personal-care',
        manufacturer: 'Mkt: Colgate',
        image: 'pictures/colgate.webp'
    }
];

const addProducts = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/medicare_pharmacy', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('MongoDB Connected...');

        await Product.deleteMany();
        console.log('Existing products removed.');

        await Product.insertMany(products);
        console.log('Products added to database.');

        mongoose.connection.close();
        console.log('MongoDB connection closed.');

    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

addProducts(); 