-- Schema for Lumière Beauté (Supabase / PostgreSQL)

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category_id BIGINT REFERENCES categories(id),
    price DECIMAL(10, 2) NOT NULL,
    image TEXT,
    description TEXT
);

-- Journal Posts table
CREATE TABLE IF NOT EXISTS journal_posts (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    excerpt TEXT,
    category VARCHAR(100) NOT NULL,
    date DATE NOT NULL,
    image TEXT
);

-- Seed Data
INSERT INTO categories (name) VALUES
('Cleansers'), ('Serums'), ('Face Oils'), ('Sets'), ('Collections')
ON CONFLICT (name) DO NOTHING;

-- Seed Products (matching frontend mock data)
INSERT INTO products (name, category_id, price, image, description) VALUES
('The Hydration Series', (SELECT id FROM categories WHERE name = 'Sets'), 185.00, 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhYPd6R7qM8-FOCG9B3lsd2MSrrkwUJ3fGyTkUoeZRbfkIy0aWkuuGMoHlYSWN4bY3uC00O3asZ9ya0mK1WywbaqFHnl58CR31Zjpxbx_W3AkyFnnCcNDSrmPgYnX5QEjxYjg1j-zsp0a4x_tLq6YPXVnr6S8FOq6RfICoKis0Sc7HilFnLPlyCqvZYmWDaoWu34ugoFystkchBVIUYmZL8lShZ80t12Bfrs2bDSAwjU2pKXxUrdkw-QlvcdPOzr4-pwH1FjZhG23O', 'Intense moisture for dewy skin'),
('Eternal Youth Serum', (SELECT id FROM categories WHERE name = 'Serums'), 120.00, 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1zbibOQb8Ri3z5F-LWfxrHNf4zVg5BzxiqHmnLBdhXumRUytfLyHo1mNlqKbUTYfwE-3DhF1KCDHX0dZOpYNjGrW_DuU6p56eq6c-rGj1GQ1vTHyl0MVgKugwJiXlwdiyv4WTiYPagJRXo-ZKkfSUhx-FP9r_WsfmHbmYizfdZnv0F-jgUUMpH22KatPsxcOGkEkXzZR91qTJ_asFFu3ZMZ9rbzfC4pRdGoRe-rmJCWi4PuUgQotyOrDhkn2p8XkG0EdJl-9cXY2A', 'Advanced anti-aging formula'),
('Radiance Rituals', (SELECT id FROM categories WHERE name = 'Collections'), 240.00, 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAbHu4IuCLLGzQ6euJdKDjhMsWVlxSMf2_A8e6hdxSjRMnmSAayikwE8vOmEwYurMPdI0ovigL06uFLUGXvZW0NTuQlmxFMjXHnA2lan00LM-k59geVw0mRvFixPI_3ir7m3UZ47fOrz8h-FMOn_nd3UHovvyTsQxrSqF0vmBATsGDT3sD73xkkjljqggrCZDAE0WsCqXJSt4cO6Z9pMnBfGJBOV47_V084o5q1vepmeF308fH0H8tmwn0FYPAcdiGtAf4LQAldzxn', 'Complete glow-enhancing routine'),
('Pure Balance', (SELECT id FROM categories WHERE name = 'Cleansers'), 65.00, 'https://lh3.googleusercontent.com/aida-public/AB6AXuBc5aBxPbBTICeI4BG1MyurPngXr0X-iLNwz9obDyWUiIe3wkst9jRvUo-G1MWDeAWHpWyY67bSpd1rkc1vI9luU8tBiyhJ0K-BZ3hVZA6AztCCxFSQ2Lp2Lm6KUzd4GTCCP7UKNOgwlLvCZlnLvO52yF7Y8FHkMQETTHGwBEdYRNW8IivgTH_a2LZS0lD9MLDil8MXVpFeu4AYCJPY_4oGsYNSlePK40GvfjrueAdAEDohRKKlQELUilSJFTyK9M5mFcXGwkq8dnUL', 'Gentle purification for all skin types'),
('Midnight Oil', (SELECT id FROM categories WHERE name = 'Face Oils'), 95.00, 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4Fk8_2OCF9cQW_sYORAJMc4RWu9AaTOoNE-MVT5CuJ254d5oTUhI066oWYI4VlwOuYtDXC45-LqYpXq14SIX8ixgqsaraVwAVdNd_xUfjtQbBXQlNwB4fKFmx3-ebqUNVluuh1Cu8oAXirFzFYc-cRR_x1VxjF2cMs6kQhE6_imD5mRueNOiG5Bne8uijnQ5CVpozKyQwmOaRF5PnE_jdB13raxOF_5ESkdKHb0eHi0jFsJmR9LI4UED8A_1BshgrUnIukVtteRz-', 'Repairing overnight treatment');

-- Seed Journal Posts
INSERT INTO journal_posts (title, excerpt, category, date, image) VALUES
('The Science of Glowing Skin', 'Discover the molecular mechanisms that drive skin radiance and how clinical ingredients can amplify your natural glow.', 'Science', '2024-12-12', 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4Fk8_2OCF9cQW_sYORAJMc4RWu9AaTOoNE-MVT5CuJ254d5oTUhI066oWYI4VlwOuYtDXC45-LqYpXq14SIX8ixgqsaraVwAVdNd_xUfjtQbBXQlNwB4fKFmx3-ebqUNVluuh1Cu8oAXirFzFYc-cRR_x1VxjF2cMs6kQhE6_imD5mRueNOiG5Bne8uijnQ5CVpozKyQwmOaRF5PnE_jdB13raxOF_5ESkdKHb0eHi0jFsJmR9LI4UED8A_1BshgrUnIukVtteRz-'),
('Winter Skincare Rituals', 'Adapt your routine for the colder months with our expert guide to maintaining hydration and barrier protection.', 'Rituals', '2024-11-28', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBl458feVkemxZYqaf44dTxuOp30gduNr4JKovb6UiNe0HkbRs2TLwFElSltDJ48az0jW0hRovNVttUCRNOOHV9DZ5KDztcLKsuO-aDN6BqXWdnKCEms2SDWtSGsTI2Tl_S1KHSNpOM9sMWYSb3WpwGTTKYcfvsAwT6qwjKLpVD0VxJ3nSl_eAbY9fxEpblG0aH9ibp5zrw9qIYxPyX2BeLGbwekLJAFdAgQIYKi_7Drtr1xIEde100vThPn9nAq07eX0XcqMUKcGUc');
