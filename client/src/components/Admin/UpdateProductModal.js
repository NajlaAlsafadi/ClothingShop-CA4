import React, { useState } from 'react';

function UpdateProductModal({ product, onClose, onSave }) {
    const [quantity, setQuantity] = useState(product.quantity);

    const handleSave = async () => {
        const response = await fetch(`/api/products/updateQuantity/${product.id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(quantity),
        });
        if (response.ok) {
            onSave({...product, quantity});
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Update Product Stock</h2>
                <div>
                    <label htmlFor="quantity">Quantity:</label>
                    <input
                        type="number"
                        id="quantity"
                        value={quantity}
                        onChange={e => setQuantity(parseInt(e.target.value))}
                    />
                </div>
                <button onClick={handleSave}>Save Changes</button>
            </div>
            <style jsx>{`
                .modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0,0,0,0.5);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .modal-content {
                    background: white;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 2px 2px 10px rgba(0,0,0,0.1);
                }
                .close {
                    float: right;
                    font-size: 28px;
                    cursor: pointer;
                }
            `}</style>
        </div>
    );
}

export default UpdateProductModal;

