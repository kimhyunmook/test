const express = require('express');
const router = express.Router();
const db = require('../db');
const fs = require('fs');
const upload = require('../middleware/upload');

/** uploads 폴더 생성 */
try {
    fs.readdirSync('client/public/uploads');
} catch (err) {
    console.error('uploads 폴더가 없습니다. 폴더를 생성합니다.')
    fs.mkdirSync('client/public/uploads');
}

router.get('/list/:type/:name/:page', (req, res) => {
    const page = req.params.page
    let sql = `
        SELECT * 
        FROM ${req.params.name}
        ORDER BY no DESC
    `;

    db.query(sql, [], (err, rows) => {
        if (err) throw err;
        let list = [];
        let start = 0;
        let listLength;
        switch (req.params.type) {
            case 'gallery':
                listLength = 6;
                break;
            default:
                listLength = 10;
                break;
        }
        let last = listLength * page;
        let i;
        let page_navigation = Math.ceil(rows.length / listLength)
        let pageArray = [];

        for (i = 0; i < page_navigation; i++) {
            pageArray.push(i + 1);
        }

        if (page >= 2) start = listLength * (page - 1);
        for (i = start; i < last; i++) {
            if (rows[i] !== undefined) list.push(rows[i])
        }

        res.status(200).json({
            array: list,
            page: pageArray
        })
    })
})


router.post('/:name/write', (req, res) => {
    let sql = '';
    let param = [];

    sql = `
            INSERT INTO ${req.params.name} (subject, content, time, id, board_type) 
            VALUE (?,?,?,?,?)
        `;
    param = [
        req.body.subject,
        req.body.content,
        req.body.time,
        req.body.id,
        req.body.board_type
    ]
    db.query(sql, param, (err, rows) => {
        if (err) throw err;
        res.status(200).json({
            create: true,
            board_type: 'normal'
        })
    })
})


router.post('/:name/galleryWrite', upload('client/public/uploads/','file'), (req, res) => {
    let sql = '';
    let param = [];
    sql = `
            INSERT INTO ${req.params.name} (subject, content, time, img, id, board_type) 
            VALUE (?,?,?,?,?,?)
        `;

    let file
    if (req.file !== undefined) {
        file = req.file.path.split('\\');
        file = file[file.length - 1];
    }
    param = [
        req.body.subject,
        req.body.content,
        req.body.time,
        file,
        req.body.id,
        req.body.board_type
    ];
    db.query(sql, param, (err, rows) => {
        if (err) throw err;
        res.status(200).json({
            create: true,
            board_type: 'gallery'
        })
    })
})




router.post('/list/:name/contents/:no', (req, res) => {
    const no = req.params.no
    let sql = `
        SELECT *
        FROM ${ req.params.name }
        WHERE no=?
    `;


    db.query(sql, [no], (err, rows) => {
        if (err) throw err;

        res.send(rows[0])
    })
})

router.post('/list/:name/modify/:no', (req, res) => {
    let sql = `
        UPDATE ${req.params.name}
        SET subject=?, content=? 
        WHERE no=${req.params.no}
    `;

    param = [
        req.body.subject,
        req.body.content
    ];

    db.query(sql, param, (err, rows) => {
        if (err) throw err
        res.send('수정')
    });
});

router.post('/list/:name/delete/:no', (req, res) => {
    let sql = `
        DELETE FROM ${req.params.name}
        WHERE no=${req.params.no}
    `
    db.query(sql, [], (err) => {
        if (err) throw err;
        res.send('삭제')
    })
})

module.exports = router