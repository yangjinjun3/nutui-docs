import { HttpClient } from './HttpClient';
import axios from 'axios';
export class ApiService {
  private httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient();
  }
  /**
   * 获取nutui文章
   * @returns
   * @memberof ArticleApiService
   */
  getArticle() {
    return this.httpClient.request('/openapi/article', 'get', {
      pageIndex: 1,
      pageSize: 100
    });
  }
  /**
   * 获取nutui使用案例
   * is_recommend 是否获取推荐位数据 1获取 0获取全部
   * @returns
   * @memberof ArticleApiService
   */
  getCases(is_recommend: number = 1) {
    return this.httpClient.request('/openapi/cases', 'get', {
      pageIndex: 1,
      pageSize: 100,
      is_recommend
    });
  }
  /**
   * 获取nutui常见问题
   * @returns
   * @memberof FaqApiService
   */
  getFaq() {
    return this.httpClient.request('/openapi/faq', 'get', {
      pageIndex: 1,
      pageSize: 100
    });
  }
  /**
   * 获取组件贡献者
   * @returns
   * @memberof contributorsApiService
   */
  getContributors(name: string) {
    return this.httpClient.request('/openapi/contributors', 'get', {
      name
    });
  }

  getReactContributors(name: string) {
    return Promise.all([
      axios.get(
        `https://api.github.com/repos/jdf2e/nutui-react/commits?path=src/packages/${name.toLowerCase()}/doc.md`
      ),
      axios.get(
        `https://api.github.com/repos/jdf2e/nutui-react/commits?path=src/packages/${name.toLowerCase()}/${name.toLowerCase()}.tsx`
      )
    ]);
  }

  /**
   * 获取FAQ
   * @returns
   * @memberof contributorsApiService
   */
  getSingleFaq(component: string) {
    return this.httpClient.request('/openapi/componentfaq', 'get', {
      component
    });
  }

  /**
   * 获取二维码数据
   * @returns
   * @memberof qrcodeApiService
   */
  getQRCode() {
    return this.httpClient.request('/openapi/qrcode', 'get', '');
  }

  /**
   * 获取nutui视频
   * @returns
   * @memberof VideoApiService
   */
  getVideo() {
    return this.httpClient.request('/openapi/video', 'get', {
      pageIndex: 1,
      pageSize: 100
    });
  }
}
