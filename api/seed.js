import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_ANON_KEY in environment');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  console.log('Starting seed process with TEST_ prefix...');

  // 1. Seed Categories
  const categories = [
    { name: 'TEST_Cleansers' },
    { name: 'TEST_Serums' },
    { name: 'TEST_Face Oils' },
    { name: 'TEST_Sets' },
    { name: 'TEST_Collections' }
  ];

  const { data: catData, error: catError } = await supabase
    .from('categories')
    .upsert(categories, { onConflict: 'name' })
    .select();

  if (catError) {
    console.error('Error seeding categories:', catError.message);
    return;
  }
  console.log('Categories seeded successfully.');

  const categoryMap = {};
  catData.forEach(cat => {
    categoryMap[cat.name.replace('TEST_', '')] = cat.id;
  });

  // 2. Seed Products
  const products = [
    {
      name: "TEST_The Hydration Series",
      category_id: categoryMap['Sets'],
      price: 185,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAhYPd6R7qM8-FOCG9B3lsd2MSrrkwUJ3fGyTkUoeZRbfkIy0aWkuuGMoHlYSWN4bY3uC00O3asZ9ya0mK1WywbaqFHnl58CR31Zjpxbx_W3AkyFnnCcNDSrmPgYnX5QEjxYjg1j-zsp0a4x_tLq6YPXVnr6S8FOq6RfICoKis0Sc7HilFnLPlyCqvZYmWDaoWu34ugoFystkchBVIUYmZL8lShZ80t12Bfrs2bDSAwjU2pKXxUrdkw-QlvcdPOzr4-pwH1FjZhG23O",
      description: "TEST_Intense moisture for dewy skin"
    },
    {
      name: "TEST_Eternal Youth Serum",
      category_id: categoryMap['Serums'],
      price: 120,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA1zbibOQb8Ri3z5F-LWfxrHNf4zVg5BzxiqHmnLBdhXumRUytfLyHo1mNlqKbUTYfwE-3DhF1KCDHX0dZOpYNjGrW_DuU6p56eq6c-rGj1GQ1vTHyl0MVgKugwJiXlwdiyv4WTiYPagJRXo-ZKkfSUhx-FP9r_WsfmHbmYizfdZnv0F-jgUUMpH22KatPsxcOGkEkXzZR91qTJ_asFFu3ZMZ9rbzfC4pRdGoRe-rmJCWi4PuUgQotyOrDhkn2p8XkG0EdJl-9cXY2A",
      description: "TEST_Advanced anti-aging formula"
    },
    {
      name: "TEST_Radiance Rituals",
      category_id: categoryMap['Collections'],
      price: 240,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCAbHu4IuCLLGzQ6euJdKDjhMsWVlxSMf2_A8e6hdxSjRMnmSAayikwE8vOmEwYurMPdI0ovigL06uFLUGXvZW0NTuQlmxFMjXHnA2lan00LM-k59geVw0mRvFixPI_3ir7m3UZ47fOrz8h-FMOn_nd3UHovvyTsQxrSqF0vmBATsGDT3sD73xkkjljqggrCZDAE0WsCqXJSt4cO6Z9pMnBfGJBOV47_V084o5q1vepmeF308fH0H8tmwn0FYPAcdiGtAf4LQAldzxn",
      description: "TEST_Complete glow-enhancing routine"
    },
    {
      name: "TEST_Pure Balance",
      category_id: categoryMap['Cleansers'],
      price: 65,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBc5aBxPbBTICeI4BG1MyurPngXr0X-iLNwz9obDyWUiIe3wkst9jRvUo-G1MWDeAWHpWyY67bSpd1rkc1vI9luU8tBiyhJ0K-BZ3hVZA6AztCCxFSQ2Lp2Lm6KUzd4GTCCP7UKNOgwlLvCZlnLvO52yF7Y8FHkMQETTHGwBEdYRNW8IivgTH_a2LZS0lD9MLDil8MXVpFeu4AYCJPY_4oGsYNSlePK40GvfjrueAdAEDohRKKlQELUilSJFTyK9M5mFcXGwkq8dnUL",
      description: "TEST_Gentle purification for all skin types"
    }
  ];

  const { error: prodError } = await supabase
    .from('products')
    .insert(products);

  if (prodError) {
    console.error('Error seeding products:', prodError.message);
  } else {
    console.log('Products seeded successfully.');
  }

  // 3. Seed Journal
  const journalPosts = [
    {
      title: "TEST_The Science of Glowing Skin",
      excerpt: "TEST_Discover the molecular mechanisms that drive skin radiance.",
      category: "Science",
      date: "2024-12-12",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB4Fk8_2OCF9cQW_sYORAJMc4RWu9AaTOoNE-MVT5CuJ254d5oTUhI066oWYI4VlwOuYtDXC45-LqYpXq14SIX8ixgqsaraVwAVdNd_xUfjtQbBXQlNwB4fKFmx3-ebqUNVluuh1Cu8oAXirFzFYc-cRR_x1VxjF2cMs6kQhE6_imD5mRueNOiG5Bne8uijnQ5CVpozKyQwmOaRF5PnE_jdB13raxOF_5ESkdKHb0eHi0jFsJmR9LI4UED8A_1BshgrUnIukVtteRz-"
    },
    {
      title: "TEST_Winter Skincare Rituals",
      excerpt: "TEST_Adapt your routine for the colder months.",
      category: "Rituals",
      date: "2024-11-28",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBl458feVkemxZYqaf44dTxuOp30gduNr4JKovb6UiNe0HkbRs2TLwFElSltDJ48az0jW0hRovNVttUCRNOOHV9DZ5KDztcLKsuO-aDN6BqXWdnKCEms2SDWtSGsTI2Tl_S1KHSNpOM9sMWYSb3WpwGTTKYcfvsAwT6qwjKLpVD0VxJ3nSl_eAbY9fxEpblG0aH9ibp5zrw9qIYxPyX2BeLGbwekLJAFdAgQIYKi_7Drtr1xIEde100vThPn9nAq07eX0XcqMUKcGUc"
    }
  ];

  const { error: journalError } = await supabase
    .from('journal_posts')
    .insert(journalPosts);

  if (journalError) {
    console.error('Error seeding journal:', journalError.message);
  } else {
    console.log('Journal seeded successfully.');
  }

  console.log('Seeding process complete.');
}

seed();
