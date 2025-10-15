// Configuración de Supabase
// IMPORTANTE: Reemplaza estas credenciales con las tuyas de Supabase

const SUPABASE_CONFIG = {
  // URL de tu proyecto Supabase
  url: 'https://fhotsfpgzuuiftfadskv.supabase.co',
  
  // API Key pública de tu proyecto Supabase
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZob3RzZnBnenV1aWZ0ZmFkc2t2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0NjQ4MjIsImV4cCI6MjA3NjA0MDgyMn0.84mj_bPceuIwO96Ugcykh3fyK3GuP2pQ1UywU3Inr0I',
  
  // Configuración de la aplicación
  app: {
    name: 'Sistema de Pedidos Caher',
    version: '1.0.0'
  }
};

// Función para inicializar el cliente Supabase
function initSupabase() {
  if (typeof supabase === 'undefined') {
    console.error('❌ Supabase no está cargado. Asegúrate de incluir el script de Supabase.');
    return null;
  }
  
  try {
    const client = supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
    console.log('✅ Cliente Supabase inicializado correctamente');
    return client;
  } catch (error) {
    console.error('❌ Error al inicializar Supabase:', error);
    return null;
  }
}

// Exportar configuración
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SUPABASE_CONFIG, initSupabase };
} else {
  window.SUPABASE_CONFIG = SUPABASE_CONFIG;
  window.initSupabase = initSupabase;
}
