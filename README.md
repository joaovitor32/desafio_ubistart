### Passo a Passo para Executar o Projeto Localmente

Para rodar as aplicações localmente, siga os seguintes passos:

1. **Configuração dos arquivos `.env`**:
   Altere os arquivos `.env` com base nos arquivos de exemplo fornecidos, para garantir que as variáveis de ambiente estejam corretas.

2. **Rodando o Backend**:
   Navegue até a pasta `backend` e execute os seguintes comandos:

   ```
   docker compose up --build -d

   yarn
   npx prisma migrate dev --name init
   yarn start
   ```

   Isso irá inicializar o ambiente Docker e iniciar o servidor backend.

3. **Rodando o Frontend**:
   Navegue até a pasta `frontend` e execute o seguinte comando:

   ```
   yarn
   yarn start
   ```

   Isso irá iniciar o servidor de desenvolvimento do frontend, abra o navegador em http://localhost:3001.
