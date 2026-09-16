import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Cliente Supabase com a service_role key — ignora RLS e enxerga auth.users (troca de
// e-mail, disparo de e-mail de redefinição de senha). USE SÓ EM API ROUTES (src/app/api/**),
// nunca em Server/Client Components — importar isso num componente vazaria a service role
// key pro bundle do cliente se algum dia virasse um "use client" por engano.
//
// A chave só existe no ambiente do servidor (SUPABASE_SERVICE_ROLE_KEY) — precisa estar
// cadastrada nas Environment Variables da Vercel além de NEXT_PUBLIC_SUPABASE_URL/ANON_KEY.
// Sem ela, toda rota em src/app/api/admin/** devolve 500 com uma mensagem explicando isso
// (ver checagem em cada route.ts), em vez de quebrar sem explicação.
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY não está configurada neste ambiente. Cadastre-a em " +
        "Vercel → Settings → Environment Variables (veja o README, seção 'Painel admin: ações que exigem a service role key')."
    );
  }

  return createSupabaseClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
