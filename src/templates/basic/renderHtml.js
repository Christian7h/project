async function renderHtml(content) {
  const svg = await getIntegrationSvg();
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${integrationName}</title>
  <link rel="stylesheet" type="text/css" href="https://static.integrations.cloudflare.com/styles.css">
  <style>
    .data-section {
      margin: 20px 0;
      padding: 15px;
      background: #f5f5f5;
      border-radius: 8px;
    }
    .data-table {
      width: 100%;
      border-collapse: collapse;
      margin: 10px 0;
    }
    .data-table th, .data-table td {
      padding: 8px;
      border: 1px solid #ddd;
      text-align: left;
    }
    .data-table th {
      background-color: #f0f0f0;
    }
  </style>
</head>
<body>
<header>
  ${svg}
  <h1>
    \u{1F389} Successfully connected to ${integrationName}
  </h1>
</header>
<main>
  <div class="data-section">
    <h2>Estadísticas de la base de datos</h2>
    <p>Número de tablas:</p>
    <pre><code>${content.numTables}</code></pre>
  </div>

  <div class="data-section">
    <h2>Datos de ejemplo</h2>
    ${content.sampleData.length > 0 ? `
      <table class="data-table">
        <thead>
          <tr>
            ${Object.keys(content.sampleData[0]).map(col => `<th>${col}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${content.sampleData.map(row => `
            <tr>
              ${Object.values(row).map(val => `<td>${val}</td>`).join('')}
            </tr>
          `).join('')}
        </tbody>
      </table>
    ` : '<p>No se encontraron registros de ejemplo</p>'}
  </div>

  <small>
    To learn more view Cloudflare's <a target="_blank" href="${docsURL}">${integrationName} Developer Documentation</a>
  </small>
</main>
</body>
</html>
`;
} 