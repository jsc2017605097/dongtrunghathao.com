const bcrypt = require('bcrypt');
export class Utils {
  public static async encryptUserPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }
  public static async decrypt(password, hash) {
    return await bcrypt.compare(password, hash);
  }
}
