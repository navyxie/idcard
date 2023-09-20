export type IdCardSuccessResult = {
  valid: true;

  /**
   * 性别
   *
   * @example M->男 F->女
   */
  gender: "M" | "F";

  province: {
    /**
     * 6位省份编号
     *
     * @example 440000
     */
    code: string;

    /**
     * 名称
     *
     * @example 广东省
     */
    text: string;
  };

  city: {
    /**
     * 6位城市编号
     *
     * @example 440800
     */
    code: string;

    /**
     * 名称
     *
     * @example 湛江市
     */
    text: string;
  };

  area: {
    /**
     * 6位区/县级市编号
     *
     * @example 440882
     */
    code: string;

    /**
     * 名称
     *
     * @example 雷州市
     */
    text: string;
  };

  /**
   * 身份证类型
   *
   * @example 1->大陆，2->港澳台
   */
  cardType: 1 | 2;

  /**
   * @example 大陆、中国台湾、中国香港、中国澳门
   */
  cardText: string;

  /**
   * @example 广东省湛江市雷州市
   */
  address: "广东省湛江市雷州市";

  /**
   * 周岁
   */
  age: number;

  /**
   * 星座
   */
  constellation: string;
};

export type IdCardResult =
  | {
      valid: false;
    }
  | IdCardSuccessResult;

export type Upgrade15To18Result = {
  /**
   * @example 0->成功 -1->失败
   */
  code: 0 | -1;

  msg: string;

  /**
   * 成功则为18位证件号；失败则为原始15位证件号
   */
  card: string;
};

/**
 * 校验【18位】身份证是否有效
 *
 * @param idcard 18位证件号
 */
export function verify(idcard: string): boolean;

/**
 * 获取【18位】身份证内信息
 *
 * @param idcard
 */
export function info(idcard: string): IdCardResult;

/**
 * 生成一个随机的【18位】身份证
 */
export function generateIdcard(): string;

/**
 * 获取星座
 *
 * @param birthday 格式->YYYYMMDD
 */
export function constellation(birthday: string | number): string;

/**
 * 获取星座
 *
 * @param birthday 格式->YYYY[split]MM[split]DD
 * @param split 分隔符
 */
export function constellation(birthday: string, split: string): string;

/**
 * 根据生日获取周岁
 *
 * @param birthday 格式->YYYYMMDD
 */
export function getAge(birthday: string | number): number;

/**
 * 15位身份证转18位
 *
 * @param oldIdcard 15位身份证
 */
export function upgrade15To18(oldIdcard: string): any;
