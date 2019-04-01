import path from 'path';
import babel from 'rollup-plugin-babel';

export default [ {
  input: path.join(__dirname, 'src/parsing/index.js'),
  plugins: [
    babel({
      exclude: 'node_modules/**'
    })
  ],
  output: {
    file: 'parsing/index.js',
    name: 'md-reactor',
    format: 'umd'
  }
}, {
  external: ['react', 'react-syntax-highlighter'],
  input: path.join(__dirname, 'src/rendering/index.js'),
  output: {
    file: 'rendering/index.js',
    name: 'md-reactor',
    format: 'umd',
    globals: {
      'react': 'React',
      'react-syntax-highlighter': 'ReactSyntaxHighlighter'
    }
  }
} ];