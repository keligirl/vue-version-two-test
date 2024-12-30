const express = require('express');  
const cors = require('cors');  
const bodyParser = require('body-parser');  

const app = express();  
const PORT = 5000;  

app.use(cors());  
app.use(bodyParser.json());  

// 示例 API 路由  
app.get('/api/data', (req, res) => {  
    res.json({ message: "Hello from Node.js!" });  
});  

app.listen(PORT, () => {  
    console.log(`Server is running on http://localhost:${PORT}`);  
});