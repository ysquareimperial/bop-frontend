const dish = (file) => new URL(`../assets/dishes/${file}.webp`, import.meta.url).href
const photo = (file) => new URL(`../assets/photos/${file}.webp`, import.meta.url).href

// Prices are in Naira. `tags` drive the small badges on the menu.
export const CATEGORIES = [
  {
    id: 'breakfast',
    title: 'Breakfast',
    blurb: 'Served from 8am. Yam, potatoes, noodles and eggs, done properly.',
    cover: photo('cat-breakfast'),
    items: [
      { id: 'fries-sausage-egg', name: 'Fries, sausage & egg', price: 500, image: dish('fries-sausage-egg'), description: 'Crisp fries with grilled sausage and a fried egg.' },
      { id: 'potato-wedges', name: 'Potato wedges & sauce', price: 1300, image: dish('potato-wedges-sauce'), description: 'Seasoned skin-on wedges with our house dipping sauce.' },
      { id: 'boiled-eggs', name: 'Boiled eggs', price: 600, image: dish('boiled-eggs'), description: 'Eggs, boiled to order.', tags: ['veg'] },
      { id: 'golden-yam', name: 'Golden yam', price: 600, image: dish('golden-yam'), description: 'Yam fried until golden outside and soft inside.', tags: ['veg'] },
      { id: 'fried-yam', name: 'Fried yam', price: 500, image: dish('fried-yam'), description: 'Classic fried yam, crisp at the edges.', tags: ['veg'] },
      { id: 'indomie-sausage-egg', name: 'Indomie, sausage & egg', price: 500, image: dish('indomie-sausage-egg'), description: 'Stir-fried noodles with sausage and egg.' },
      { id: 'indomie-sardine', name: 'Indomie, sausage, egg & sardine', price: 700, image: dish('indomie-sausage-egg-sardine'), description: 'The full version, with sardines folded through.' },
    ],
  },
  {
    id: 'english-breakfast',
    title: 'English breakfast',
    blurb: 'Made fresh to order.',
    cover: photo('cat-breakfast'),
    items: [
      { id: 'toast-pancake-sausage', name: 'Toast, pancake & sausage', price: 500, image: dish('toast-pancake-sausage'), description: 'Buttered toast, a fluffy pancake and grilled sausage.' },
      { id: 'baked-beans-egg', name: 'Baked beans & egg', price: 1300, image: dish('baked-beans-egg'), description: 'Warm baked beans with eggs your way.', tags: ['veg'] },
    ],
  },
  {
    id: 'lunch',
    title: 'Rice & lunch',
    blurb: 'From Hausa kitchens to Yemeni mandi, the rice is the point.',
    cover: photo('cat-rice'),
    items: [
      { id: 'mandi-rice', name: 'Mandi rice', price: 2500, image: dish('mandi-rice'), description: 'Fragrant spiced rice with tender chicken, Arabian style.', tags: ['signature'] },
      { id: 'fried-rice', name: 'Fried rice', price: 2500, image: dish('fried-rice'), description: 'Wok-fried rice with mixed vegetables.' },
      { id: 'jollof-rice', name: 'Jollof rice', price: 2000, image: dish('jollof-rice'), description: 'Smoky, party-style jollof.', tags: ['signature'] },
      { id: 'white-rice', name: 'White rice', price: 2000, image: dish('white-rice'), description: 'Steamed rice served with stew.' },
    ],
  },
  {
    id: 'pasta',
    title: 'Pasta & spaghetti',
    blurb: 'Recipes Hajiya brought home from her years cooking in Italy.',
    cover: photo('cat-pasta'),
    items: [
      { id: 'spaghetti-meatballs', name: 'Spaghetti & meatballs', price: 3000, image: dish('spaghetti-meatballs-sauce'), description: 'Beef meatballs simmered in tomato sauce.', tags: ['signature'] },
      { id: 'stir-fried-spaghetti', name: 'Stir-fried spaghetti', price: 800, image: dish('stir-fried-spaghetti'), description: 'Spaghetti tossed with peppers and onions.' },
      { id: 'spaghetti-bolognese', name: 'Spaghetti bolognese', price: 2000, image: dish('spaghetti-bolognese'), description: 'Slow-cooked beef ragù.' },
      { id: 'spaghetti-lomein', name: 'Spaghetti lo mein', price: 2500, image: dish('sss'), description: 'Soy-glazed noodles with chicken and greens.' },
    ],
  },
  {
    id: 'grills',
    title: 'Grills',
    blurb: 'Chicken off the grill, in our house marinade.',
    cover: photo('tawook-grill'),
    items: [
      { id: 'bop-chicken-grill', name: 'BoP chicken grill (full)', price: 4500, image: dish('bop-chicken-grill-full'), description: 'A whole chicken in our house marinade. Made for sharing.', tags: ['signature'] },
      { id: 'shish-tawook', name: 'Shish tawook (4 sticks)', price: 2500, image: dish('shish-tawook-4sticks'), description: 'Garlic and lemon chicken skewers.' },
      { id: 'chicken-skewers-plate', name: 'Chicken skewers plate', price: 600, image: dish('chicken-skewers-served'), description: 'Skewers with fries, hummus and bread.' },
    ],
  },
  {
    id: 'sides',
    title: 'Sides',
    blurb: 'Add one, or two.',
    cover: photo('wedges'),
    items: [
      { id: 'french-fries', name: 'French fries', price: 500, image: dish('french-fries'), description: 'Thin and crisp, lightly salted.', tags: ['veg'] },
      { id: 'herbed-potatoes', name: 'Herbed potatoes', price: 1300, image: dish('herbed-potatoes'), description: 'Roast potatoes with rosemary and garlic.', tags: ['veg'] },
      { id: 'mashed-potatoes', name: 'Mashed potatoes', price: 600, image: dish('mashed-potatoes'), description: 'Smooth and buttery.', tags: ['veg'] },
    ],
  },
  {
    id: 'appetizers',
    title: 'Appetizers',
    blurb: 'Small plates while you wait.',
    cover: photo('cat-appetizers'),
    items: [
      { id: 'samosa', name: 'Samosa (chicken or beef)', price: 100, unit: 'each', image: dish('samosa-chickenbeefs'), description: 'Crisp pastry filled with spiced meat.' },
      { id: 'spring-rolls', name: 'Spring rolls (chicken or veg)', price: 100, unit: 'each', image: dish('springrolls-chickenveg'), description: 'Golden, crisp rolls.' },
      { id: 'buffalo-wings', name: 'Buffalo wings (4 pcs)', price: 1500, image: dish('buffalo-wings'), description: 'Tossed in a tangy, buttery hot sauce.' },
    ],
  },
  {
    id: 'soup',
    title: 'Soup',
    blurb: 'Warm bowls from three corners of the world.',
    cover: photo('cat-soup'),
    items: [
      { id: 'minestrone', name: 'Minestrone', price: 1500, image: dish('minestrone-soup'), description: 'Italian vegetable soup with pasta.', tags: ['veg'] },
      { id: 'chicken-sweetcorn', name: 'Creamy chicken & sweetcorn', price: 1500, image: dish('chicken-sweet-corn-creamy'), description: 'Silky, mild and comforting.' },
      { id: 'peking-soup', name: 'Peking soup', price: 1500, image: dish('peking-soup'), description: 'Hot and sour, with chicken and egg ribbons.' },
    ],
  },
]

export const ALL_ITEMS = CATEGORIES.flatMap((c) =>
  c.items.map((item) => ({ ...item, category: c.id, categoryTitle: c.title })),
)

export const ITEM_BY_ID = Object.fromEntries(ALL_ITEMS.map((i) => [i.id, i]))

export const SIGNATURES = ['bop-chicken-grill', 'mandi-rice', 'spaghetti-meatballs', 'jollof-rice', 'shish-tawook', 'buffalo-wings'].map(
  (id) => ITEM_BY_ID[id],
)

// Old URLs from the previous site, so shared links keep working.
export const LEGACY_CATEGORY = { ebreakfast: 'english-breakfast', beef: 'grills', Beef: 'grills' }

export const PHOTOS = {
  interior: photo('interior'),
  owners: photo('owners'),
  chef: photo('chef-plating'),
  team: photo('kitchen-team'),
  tawook: photo('tawook-grill'),
  pasta: photo('pasta'),
  wedges: photo('wedges'),
  rice: photo('cat-rice'),
  breakfast: photo('cat-breakfast'),
}
