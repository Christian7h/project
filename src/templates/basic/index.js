var basic_default = {
  async fetch(request, env) {
    const client = createClient({ url: env.TURSO_URL, authToken: env.TURSO_AUTH_TOKEN });
    
    // Obtener número de tablas
    const tablesResult = await client.execute(`
      SELECT count(*) AS num_tables FROM sqlite_master
      WHERE type ='table' AND name NOT IN ('libsql_wasm_func_table','_litestream_seq','_litestream_lock')
    `);
    
    // Obtener datos de ejemplo (usando la nueva función)
    let sampleData = [];
    try {
      const dataResult = await client.execute("SELECT * FROM users LIMIT 5");
      sampleData = dataResult.rows;
    } catch (error) {
      console.log("Error obteniendo datos de ejemplo:", error.message);
    }

    const html = await renderHtml({
      numTables: tablesResult.rows[0].num_tables,
      sampleData: sampleData
    });
    
    return new Response(html, {
      status: 200,
      headers: {
        "Content-Type": "text/html"
      }
    });
  }
}; 