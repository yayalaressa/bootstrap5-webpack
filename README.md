# Bootstrap5 w/ Webpack + PurgeCSS

# Prepare
Pastikan sudah menginstall `git`, `nodejs`, dan `npm`

# Execute
1. Git clone `git clone https://github.com/yayalaressa/bootstrap5-webpack.git`
2. Masuk ke path `cd bootstrap5-webpack`
3. Install `node_module` yang diperlukan;
  - Webpack `npm i --save-dev webpack webpack-cli webpack-dev-server`
  - Bootstrap dan PopperJS `npm i --save bootstrap @popperjs/core`
  - MiniCSS Extractor `npm install --save-dev mini-css-extract-plugin`
  - PurgeCSS `npm i purgecss-webpack-plugin -D`
  - Additional plugins `npm i --save-dev autoprefixer css-loader postcss-loader sass sass-loader style-loader`
4. Selanjutnya `npm start`
5. Untuk build `npm run build`