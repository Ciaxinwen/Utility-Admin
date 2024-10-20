import CryptoJS from 'crypto-js';
import { Buffer } from 'buffer';

// 讯飞星火模型主机和路径
const HOST = 'spark-api.xf-yun.com';
const PATH = '/v1.1/chat';
const APISecret = import.meta.env.VITE_SPARK_APISECRET;
const APIKey = import.meta.env.VITE_SPARK_APIKEY;
const APIID = import.meta.env.VITE_SPARK_APIID;
const CHAT_DOMAIN = import.meta.env.VITE_SPARK_CHAT_DOMAIN;

/**
 * @description: 返回讯飞星火API的url
 * @param {*} string
 * @return {*}
 */
const generaSparkUrl = (): string => {
  const dateString = new Date().toUTCString();
  // 构建用于签名的请求头
  let tmp = `host: ${HOST}\ndate: ${dateString}\nGET ${PATH} HTTP/1.1`;
  const signature = CryptoJS.HmacSHA256(tmp, APISecret);
  const signaturesha = CryptoJS.enc.Base64.stringify(signature);
  const authorization_origin = `api_key="${APIKey}", algorithm="hmac-sha256", headers="host date request-line", signature="${signaturesha}"`;
  // 将授权信息编码为 Base64 格式
  let buff = Buffer.from(authorization_origin);
  const authorization = buff.toString('base64');
  // 构建访问星火 API 的 WebSocket URL
  const signUrl = `wss://${HOST}${PATH}?authorization=${authorization}&date=${encodeURIComponent(dateString)}&host=${HOST}`;
  return signUrl;
};

/**
 * @description: 生成消息模板
 * @param {string} msg
 * @return {*}
 */
const generaTemplateMsg = (msg: string) => {
  return JSON.stringify({
    header: {
      app_id: APIID,
    },
    parameter: {
      chat: {
        domain: CHAT_DOMAIN,
        temperature: 0.5,
        max_tokens: 1024,
      },
    },
    payload: {
      message: {
        text: [
          {
            role: 'user',
            content: msg,
          },
        ],
      },
    },
  });
};

export const useSparkModel = () => {
  const ws = ref();

  /**
   * @description: 建立连接
   * @return {*}
   */
  function init() {
    return new Promise((resolve, reject) => {
      let questionValue = '';
      const signUrl = generaSparkUrl();
      ws.value = new WebSocket(signUrl);

      ws.value.onopen = function () {
        console.log('讯飞星火连接sock连接成功!!!!');
      };

      ws.value.onerror = function (err) {
        console.log('error: ', err);
        reject(err);
      };

      ws.value.onmessage = function (data) {
        const res = JSON.parse(data.data);
        const texts = res.payload.choices.text;
        texts.forEach((item) => {
          questionValue += item.content;
        });
        console.log(questionValue);
      };

      ws.value.onclose = function () {
        resolve(questionValue);
      };
    });
  }

  function send(msg: string) {
    ws.value.send(generaTemplateMsg(msg));
  }

  return { init, send, ws };
};
