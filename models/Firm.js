const mongoose = require('mongoose');

const firmSchema = new mongoose.Schema({
    firmName: {
        type: String,
        required: true,
        unique: true
    },
    area: {
        type: String,
        required: true
    },
    category: {
        type: [{
            type: String,
            enum: ['Clothing', 'Accessories', 'Footwear', 'Beauty & Self-Care']
        }]
    },
    
    region: {
        type: [{
            type: String,
            enum: [
                // Clothing - Traditional Wear
                'Sarees (Pattu, Fancy, Cotton, Silk)',
                'Lehengas',
                'Salwar Kameez & Kurtis',
                'Sherwanis & Ethnic Wear',
                'Dhotis & Veshtis',
                'Bridal Wear',

                // Clothing - Western Wear
                'Dresses & Gowns',
                'Tops & T-Shirts',
                'Jeans & Trousers',
                'Jumpsuits & Playsuits',
                'Blazers & Jackets',
                'Winter Wear',

                // Accessories - Traditional
                'Temple Jewelry',
                'Handmade Bangles & Bracelets',
                'Maang Tikka & Bindis',
                'Anklets & Toe Rings',
                'Nose Rings (Nath)',

                // Accessories - Modern
                'Handbags & Clutches',
                'Sunglasses & Watches',
                'Fashion Jewelry (Earrings, Necklaces)',
                'Scarves & Stoles',
                'Belts & Hair Accessories',

                // Footwear - Ethnic
                'Juttis & Mojaris',
                'Kolhapuris',
                'Peshawari Sandals',
                'Embroidered Slippers',
                'Khussa Shoes',

                // Footwear - Modern
                'Sneakers & Sports Shoes',
                'Loafers & Moccasins',
                'Heels (Block, Pencil, Wedges, Kitten)',
                'Flats & Ballerinas',
                'Sandals & Slippers',
                'Boots & Ankle Boots',

                // Footwear - Handcrafted
                'Handmade Leather Footwear',
                'Embellished & Designer Shoes',
                'Vegan & Sustainable Footwear',

                // Beauty & Self-Care - Organic & Ayurvedic
                'Herbal Face Packs & Ubtans',
                'Essential Oils & Natural Fragrances',
                'Organic Skincare (Facewash, Moisturizers, Serums)',
                'Ayurvedic Haircare (Shampoos, Oils, Masks)',
                'Handmade Soaps & Bath Salts',

                // Beauty & Self-Care - Luxury & Premium
                'Luxury Skincare (Serums, Anti-aging, Masks)',
                'Premium Perfumes & Fragrances',
                'Exclusive Makeup Brands',
                'Salon-grade Haircare',

                // Beauty & Self-Care - Budget & Essentials
                'Basic Skincare (Face Creams, Cleansers, Sunscreens)',
                'Affordable Makeup (Kajal, Lip Balms, Compact Powders)',
                'Daily-use Haircare (Shampoos, Conditioners, Hair Oils)',
                'Hygiene & Body Care (Deodorants, Soaps, Sanitary Products)'
            ]
        }]
    },
    offer: {
        type: String,
    },
    image: {
        type: String
    },
    vendor: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Vendor'
        }
    ],
    products :[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            }
        ]
});

const Firm = mongoose.model('Firm', firmSchema);
module.exports = Firm;
