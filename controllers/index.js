// fungsi membaca halaman index
function index(req, res) {
    res.render("main/index");
}

// ekspor modul
module.exports = {
    index,
};
