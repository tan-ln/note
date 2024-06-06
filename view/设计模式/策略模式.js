/**
 * 策略模式  是一种行为设计模式，定义一系列算法，将每一个算法封装起来，并让它们可以相互替换
 * 让算法独立于使用它的客户而变化，也称为政策模式（Policy）
 */

// 原始需求
function getPrice(originalPrice, status) {
  if (status === "pre-sale") {
      return originalPrice * 0.8;
  }

  if (status === "promotion") {
      if (origialPrice <= 100) {
          return origialPrice * 0.9;
      } else {
          return originalPrice - 20;
      }
  }
  // 黑色星期五规则
  if (status === "black-friday") {
      if (origialPrice >= 100 && originalPrice < 200) {
          return origialPrice - 20;
      } else if (originalPrice >= 200) {
          return originalPrice - 50;
      } else {
          return originalPrice * 0.8;
      }
  }

  if (status === "default") {
      return originalPrice;
  }
}

// 使用策略模式
/**
 * 预售商品价格规则
 * @param {*} origialPrice
 * @returns
 */
function preSalePrice(origialPrice) {
  return originalPrice * 0.8;
}
/**
* 促销商品价格规则
* @param {*} origialPrice
* @returns
*/
function promotionPrice(origialPrice) {
  if (origialPrice <= 100) {
      return origialPrice * 0.9;
  } else {
      return originalPrice - 20;
  }
}
/**
* 黑色星期五促销规则
* @param {*} origialPrice
* @returns
*/
function blackFridayPrice(origialPrice) {
  if (origialPrice >= 100 && originalPrice < 200) {
      return origialPrice - 20;
  } else if (originalPrice >= 200) {
      return originalPrice - 50;
  } else {
      return originalPrice * 0.8;
  }
}
/**
* 默认商品价格
* @param {*} origialPrice
* @returns
*/
function defaultPrice(origialPrice) {
  return origialPrice;
}

// 保持映射关系
const priceStrategies = {
  "pre-sale": preSalePrice,
  promotion: promotionPrice,
  "black-friday": blackFridayPrice,
  default: defaultPrice,
};

function getPrice(originalPrice, status) {
  return priceStrategies[status](originalPrice);
}

// 将具体的业务逻辑抽离
// 构造一个策略的映射关系



