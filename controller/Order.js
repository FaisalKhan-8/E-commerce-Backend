import Order from '../model/Order';

export async function fetchOrdersByUser(req, res) {
  const { user } = req.query;
  try {
    const orders = await Order.find({ user: user });

    res.status(200).json(orders);
  } catch (err) {
    res.status(400).json(err);
  }
}

export async function createOrder(req, res) {
  const order = new Order(req.body);
  try {
    const doc = await order.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
}

export async function deleteOrder(req, res) {
  const { id } = req.params;
  try {
    const order = await Order.findByIdAndDelete(id);
    res.status(200).json(order);
  } catch (err) {
    res.status(400).json(err);
  }
}

export async function updateOrder(req, res) {
  const { id } = req.params;
  try {
    const order = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(order);
  } catch (err) {
    res.status(400).json(err);
  }
}
