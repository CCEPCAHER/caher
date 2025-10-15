-- Esquema de base de datos para Sistema de Pedidos Caher
-- Ejecutar este script en el SQL Editor de Supabase

-- Habilitar extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabla de usuarios administradores
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de productos
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  previous_price DECIMAL(10,2),
  section VARCHAR(100) NOT NULL,
  is_new BOOLEAN DEFAULT false,
  has_quantity_alert BOOLEAN DEFAULT false,
  min_quantity INTEGER DEFAULT 0,
  quantities JSONB DEFAULT '[]'::jsonb,
  created_by UUID REFERENCES admin_users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de notificaciones
CREATE TABLE IF NOT EXISTS notifications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  type VARCHAR(50) DEFAULT 'info',
  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES admin_users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de secciones
CREATE TABLE IF NOT EXISTS sections (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  display_name VARCHAR(100) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insertar secciones por defecto
INSERT INTO sections (name, display_name) VALUES
('Coca Cola', 'Coca Cola'),
('FEM ALCAMPO', 'FEM ALCAMPO'),
('Alcoholes', 'Alcoholes'),
('Aguas', 'Aguas'),
('Bebidas Energéticas', 'Bebidas Energéticas'),
('Bebidas Isotónicas', 'Bebidas Isotónicas'),
('Bebidas Light', 'Bebidas Light'),
('Bebidas Sin Azúcar', 'Bebidas Sin Azúcar'),
('Bebidas Zero', 'Bebidas Zero'),
('Cervezas', 'Cervezas'),
('Refrescos', 'Refrescos'),
('Tés', 'Tés'),
('Zumos', 'Zumos')
ON CONFLICT (name) DO NOTHING;

-- Insertar usuario administrador por defecto
-- NOTA: La contraseña 'admin123' está hasheada con bcrypt
INSERT INTO admin_users (email, password_hash, name) VALUES
('admin@caher.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Administrador')
ON CONFLICT (email) DO NOTHING;

-- Crear índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_products_section ON products(section);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at);
CREATE INDEX IF NOT EXISTS idx_notifications_active ON notifications(is_active);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para actualizar updated_at
CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_notifications_updated_at BEFORE UPDATE ON notifications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Políticas de seguridad (RLS - Row Level Security)
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE sections ENABLE ROW LEVEL SECURITY;

-- Política para admin_users (solo el propio usuario puede ver sus datos)
CREATE POLICY "Users can view own profile" ON admin_users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON admin_users FOR UPDATE USING (auth.uid() = id);

-- Política para products (todos pueden leer, solo admins pueden escribir)
CREATE POLICY "Anyone can view products" ON products FOR SELECT USING (true);
CREATE POLICY "Admins can insert products" ON products FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admins can update products" ON products FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can delete products" ON products FOR DELETE USING (auth.role() = 'authenticated');

-- Política para notifications (todos pueden leer, solo admins pueden escribir)
CREATE POLICY "Anyone can view notifications" ON notifications FOR SELECT USING (true);
CREATE POLICY "Admins can insert notifications" ON notifications FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admins can update notifications" ON notifications FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can delete notifications" ON notifications FOR DELETE USING (auth.role() = 'authenticated');

-- Política para sections (todos pueden leer, solo admins pueden escribir)
CREATE POLICY "Anyone can view sections" ON sections FOR SELECT USING (true);
CREATE POLICY "Admins can insert sections" ON sections FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admins can update sections" ON sections FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can delete sections" ON sections FOR DELETE USING (auth.role() = 'authenticated');


