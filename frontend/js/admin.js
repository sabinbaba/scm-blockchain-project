document.addEventListener("DOMContentLoaded", function() {

    console.log("Admin JS Loaded");

    // Display Admin Name
    var adminNameEl = document.getElementById("adminName");
    if (adminNameEl) {
        adminNameEl.innerText = "Admin";
    }

    // Sidebar Active Highlight
    var currentPage = window.location.pathname.split("/").pop();
    var sidebarLinks = document.querySelectorAll(".sidebar ul li a");
    for (var i = 0; i < sidebarLinks.length; i++) {
        if (sidebarLinks[i].getAttribute("href") === currentPage) {
            sidebarLinks[i].parentElement.classList.add("active");
        } else {
            sidebarLinks[i].parentElement.classList.remove("active");
        }
    }

    // Global Click Handler for modal backdrop clicks
    document.addEventListener("click", function(event) {
        if (event.target.classList && event.target.classList.contains("modal")) {
            event.target.style.display = "none";
        }
    });

    // Close Button Handler for All Modals
    document.addEventListener("click", function(event) {
        if (event.target.classList && event.target.classList.contains("close")) {
            event.target.closest(".modal").style.display = "none";
        }
    });

    // ============================
    // Manage Users Page
    // ============================
    var userModal = document.getElementById("userModal");
    var addUserBtn = document.getElementById("addUserBtn");
    var usersTable = document.getElementById("usersTable");

    // Open user modal
    if (addUserBtn) {
        addUserBtn.addEventListener("click", function() {
            userModal.style.display = "block";
            var modalTitle = document.getElementById("modalTitle");
            if (modalTitle) {
                modalTitle.innerText = "Add User";
            }
            var userForm = document.getElementById("userForm");
            if (userForm) {
                userForm.dataset.editId = "";
                userForm.reset();
            }
        });
    }

    // User Form Submission
    var userForm = document.getElementById("userForm");
    if (userForm) {
        userForm.addEventListener("submit", function(e) {
            e.preventDefault();
            var name = document.getElementById("userName").value;
            var email = document.getElementById("userEmail").value;
            var role = document.getElementById("userRole").value;
            var editId = this.dataset.editId;

            if (editId) {
                // Edit user
                var row = document.getElementById(editId);
                if (row) {
                    row.cells[1].innerText = name;
                    row.cells[2].innerText = role;
                    row.cells[3].innerText = email;
                }
            } else {
                // Add user
                var newRow = usersTable.insertRow();
                var userId = "U" + String(usersTable.rows.length).padStart(3, "0");
                newRow.id = userId;
                newRow.innerHTML = '<td>' + userId + '</td>' +
                    '<td>' + name + '</td>' +
                    '<td>' + role + '</td>' +
                    '<td>' + email + '</td>' +
                    '<td><button class="edit-btn">Edit</button> <button class="delete-btn">Delete</button></td>';
                attachUserRowEvents(newRow);
            }

            userModal.style.display = "none";
            this.reset();
        });
    }

    // Attach Edit/Delete for existing rows
    function attachUserRowEvents(row) {
        var editBtn = row.querySelector(".edit-btn");
        var deleteBtn = row.querySelector(".delete-btn");

        if (editBtn) {
            editBtn.addEventListener("click", function() {
                userModal.style.display = "block";
                var modalTitle = document.getElementById("modalTitle");
                if (modalTitle) {
                    modalTitle.innerText = "Edit User";
                }
                document.getElementById("userName").value = row.cells[1].innerText;
                document.getElementById("userEmail").value = row.cells[3].innerText;
                document.getElementById("userRole").value = row.cells[2].innerText;
                document.getElementById("userForm").dataset.editId = row.id;
            });
        }

        if (deleteBtn) {
            deleteBtn.addEventListener("click", function() {
                if (confirm("Are you sure you want to delete this user?")) {
                    row.remove();
                }
            });
        }
    }

    if (usersTable) {
        var userRows = usersTable.querySelectorAll("tr");
        for (var j = 0; j < userRows.length; j++) {
            attachUserRowEvents(userRows[j]);
        }
    }

    // ============================
    // View Products Page
    // ============================
    var productModal = document.getElementById("productModal");
    var transferModal = document.getElementById("transferModal");
    var addProductBtn = document.getElementById("addProductBtn");
    var productForm = document.getElementById("productForm");
    var transferForm = document.getElementById("transferForm");
    var productsTable = document.getElementById("productsTable");
    var editProductId = "";

    // Open product modal
    if (addProductBtn) {
        addProductBtn.addEventListener("click", function() {
            productModal.style.display = "block";
            var modalTitle = document.getElementById("modalTitle");
            if (modalTitle) {
                modalTitle.innerText = "Add Product";
            }
            if (productForm) {
                productForm.reset();
            }
            editProductId = "";
        });
    }

    // Product Form Submission
    if (productForm) {
        productForm.addEventListener("submit", function(e) {
            e.preventDefault();
            var name = document.getElementById("productName").value;
            var category = document.getElementById("productCategory").value;
            var owner = document.getElementById("productOwner").value;
            var status = document.getElementById("productStatus").value;
            var date = document.getElementById("productDate").value;
            var batch = document.getElementById("productBatch").value;

            if (editProductId) {
                // Edit product
                var row = document.getElementById(editProductId);
                if (row) {
                    row.cells[1].innerText = name;
                    row.cells[2].innerText = category;
                    row.cells[3].innerText = owner;
                    row.cells[4].innerText = status;
                    row.cells[5].innerText = date;
                    row.cells[6].innerText = batch;
                }
            } else {
                // Add new product
                var newRow = productsTable.insertRow();
                var pid = "P" + String(productsTable.rows.length).padStart(3, "0");
                newRow.id = pid;
                newRow.innerHTML = '<td>' + pid + '</td>' +
                    '<td>' + name + '</td>' +
                    '<td>' + category + '</td>' +
                    '<td>' + owner + '</td>' +
                    '<td>' + status + '</td>' +
                    '<td>' + date + '</td>' +
                    '<td>' + batch + '</td>' +
                    '<td><button class="edit-btn">Edit</button> <button class="transfer-btn">Transfer</button></td>';
                attachProductEvents(newRow);
            }

            productModal.style.display = "none";
        });
    }

    // Attach events to product row
    function attachProductEvents(row) {
        var editBtn = row.querySelector(".edit-btn");
        var transferBtn = row.querySelector(".transfer-btn");

        if (editBtn) {
            editBtn.addEventListener("click", function() {
                editProductId = row.id;
                productModal.style.display = "block";
                var modalTitle = document.getElementById("modalTitle");
                if (modalTitle) {
                    modalTitle.innerText = "Edit Product";
                }
                document.getElementById("productName").value = row.cells[1].innerText;
                document.getElementById("productCategory").value = row.cells[2].innerText;
                document.getElementById("productOwner").value = row.cells[3].innerText;
                document.getElementById("productStatus").value = row.cells[4].innerText;
                document.getElementById("productDate").value = row.cells[5].innerText;
                document.getElementById("productBatch").value = row.cells[6].innerText;
            });
        }

        if (transferBtn) {
            transferBtn.addEventListener("click", function() {
                transferModal.style.display = "block";
                if (transferForm) {
                    transferForm.dataset.rowId = row.id;
                }
                document.getElementById("newOwner").value = "";
            });
        }
    }

    // Transfer Form Submission
    if (transferForm) {
        transferForm.addEventListener("submit", function(e) {
            e.preventDefault();
            var newOwner = document.getElementById("newOwner").value;
            var rowId = this.dataset.rowId;
            var row = document.getElementById(rowId);
            if (row) {
                row.cells[3].innerText = newOwner;
                row.cells[4].innerText = "In Transit";
            }
            transferModal.style.display = "none";
        });
    }

    // Initialize existing product rows
    if (productsTable) {
        var productRows = productsTable.querySelectorAll("tr");
        for (var k = 0; k < productRows.length; k++) {
            attachProductEvents(productRows[k]);
        }
    }

    // ============================
    // Demo Products
    // ============================
    var demoProducts = [
        {id: 'P003', name: 'Laptop', category: 'Electronics', owner: 'Distributor', status: 'In Transit', date: '2026-01-02', batch: 'B003'},
        {id: 'P004', name: 'Vaccine', category: 'Health', owner: 'Manufacturer', status: 'Created', date: '2026-01-01', batch: 'B004'}
    ];

    if (productsTable) {
        for (var m = 0; m < demoProducts.length; m++) {
            var product = demoProducts[m];
            var row = document.createElement("tr");
            row.innerHTML = '<td>' + product.id + '</td>' +
                '<td>' + product.name + '</td>' +
                '<td>' + product.category + '</td>' +
                '<td>' + product.owner + '</td>' +
                '<td>' + product.status + '</td>' +
                '<td>' + product.date + '</td>' +
                '<td>' + product.batch + '</td>';
            productsTable.appendChild(row);
        }
    }

    // ============================
    // Blockchain Transactions Page
    // ============================
    var txTableBody = document.getElementById("txTable");
    var demoTransactions = [
        {hash: '0xIJKL1234', action: 'Add Product', product: 'P002', sender: 'Manufacturer2', receiver: '-', datetime: '2026-01-02 11:00 AM'},
        {hash: '0xMNOP5678', action: 'Transfer Product', product: 'P002', sender: 'Manufacturer2', receiver: 'Distributor2', datetime: '2026-01-02 01:00 PM'}
    ];

    if (txTableBody) {
        for (var n = 0; n < demoTransactions.length; n++) {
            var tx = demoTransactions[n];
            var txRow = document.createElement("tr");
            txRow.innerHTML = '<td>' + tx.hash + '</td>' +
                '<td>' + tx.action + '</td>' +
                '<td>' + tx.product + '</td>' +
                '<td>' + tx.sender + '</td>' +
                '<td>' + tx.receiver + '</td>' +
                '<td>' + tx.datetime + '</td>';
            txTableBody.appendChild(txRow);
        }
    }

    // ============================
    // System Logs Page
    // ============================
    var logsTableBody = document.getElementById("logsTable");
    var demoLogs = [
        {id: 'L004', user: 'Retailer1', action: 'Sell Product', status: 'Success', datetime: '2026-01-02 01:15 PM', details: 'Product ID: P002 sold'},
        {id: 'L005', user: 'Customer', action: 'Verify Product', status: 'Success', datetime: '2026-01-02 02:00 PM', details: 'Product ID: P002 verified'}
    ];

    if (logsTableBody) {
        for (var p = 0; p < demoLogs.length; p++) {
            var log = demoLogs[p];
            var logRow = document.createElement("tr");
            logRow.innerHTML = '<td>' + log.id + '</td>' +
                '<td>' + log.user + '</td>' +
                '<td>' + log.action + '</td>' +
                '<td>' + log.status + '</td>' +
                '<td>' + log.datetime + '</td>' +
                '<td>' + log.details + '</td>';
            logsTableBody.appendChild(logRow);
        }
    }

}); // End DOMContentLoaded

