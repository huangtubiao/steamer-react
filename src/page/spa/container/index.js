import React, { Component, PropTypes } from 'react';
import merge from 'lodash.merge';
import { render } from 'react-dom';
import { getHash, isHttps } from 'utils';
import Connect from '../connect/connect';
import { GET_NEWS_LIST, GET_TOP_NEWS, GET_NEWS_DETAIL } from '../../common/constants/constants';
import { LATEST_NEWS, LIKE_NEWS } from '../constants/constants';

import Scroll from 'scroll';
import Spinner from 'spinner';
import List from '../components/list/index';
import Tab from '../components/tab/index';
import Loading from '../components/loading/index';

require('./index.scss');


class Wrapper extends Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			lock: true
		};
		this.firstGetAllData = false;
		this.loadTopNews = this.loadTopNews.bind(this);
		this.loadNewsList = this.loadNewsList.bind(this);
		this.loadData = this.loadData.bind(this);
		this.loadDataForScroll = this.loadDataForScroll.bind(this);
		this.getNewsDetail = this.getNewsDetail.bind(this);
	}

	componentDidMount() {
		setTimeout(() => {
			this.setState({
				lock: false,
			});
		}, 100);
	}

	componentWillMount() {
		if (this.props.news.ids.length === 0) {
			this.loadTopNews();
		}
	}

	componentWillReceiveProps(nextProps) {
		this.props.toggleSpinLoading(false);
		
		return true;
	}

	loadDataForScroll() {
		this.loadNewsList(null);
	}

	loadTopNews() {
		var url = GET_TOP_NEWS,
			opts = {};

		var pa = merge({}, {
			chlid: 'news_news_top',
			refer: 'mobilewwwqqcom',
			otype: 'jsonp',
			callback: 'getNewsIndexOutput',
			t: (new Date()).getTime()
		}, pa);

		var param = {
			param: pa,
			ajaxType: 'JSONP',
			onSuccess: function(res) {
				// console.log(res);
			},
			onError: function(res) {
				// console.log(res);
				// alert(res.errMsg || '加载新闻列表失败，请稍后重试');
			}
		};

		this.props.request(url, param, opts);
	}

	loadNewsList(props) {
		var props = props || this.props;

		this.loadData(LATEST_NEWS, {});
	}

	//http://mat1.gtimg.com/www/mobi/image/loadimg.png

	loadData(listType, pa = {}, opts = {}) {
		var _this = this;
		var url = GET_NEWS_LIST;

		var listInfoParam = this.props.news.listInfo['listLatest'],
			ids = this.props.news.ids,
			args = this.props.args;

		// 防止重复拉取
		if (listInfoParam.isLoading) {
			return;
		}

		var curPage = listInfoParam.curPage,
			page_size = listInfoParam.pageSize,
			startIndex = 0 + (curPage) * page_size,
			endIndex = startIndex + page_size;

		var newIds = ids.slice(startIndex, endIndex),
			newIdArray = [];


		newIds.forEach((item, index) => {
			newIdArray.push(item.id);
		});

		var pa = merge({}, {
			cmd: GET_NEWS_LIST,
			ids: newIdArray.join(','),
			refer: "mobilewwwqqcom",
			otype: "jsonp",
			callback: "getNewsContentOnlyOutput",
			t: (new Date()).getTime(),
		}, pa);

		var param = {
			param: pa,
			ajaxType: 'JSONP',
			onSuccess: function(data) {
				console.log(data);
			},
			onError: function(res) {
				console.log("err");
				// console.log(res);
				// alert(res.errMsg || '加载新闻列表失败，请稍后重试');
			}
		};

		this.props.request(url, param, opts);
	}

	getNewsDetail(item) {
		let url = GET_NEWS_DETAIL,
			opts = {};

		var pa = merge({}, {
			url: item.url,
			news_id: item.id,
			v: (new Date()).getTime(),
		}, pa);

		var param = {
			param: pa,
			ajaxType: 'POST',
			onSuccess: function(data) {
				
			},
			onError: function(res) {
				console.log("err");
			}
		};

		this.props.request(url, param, opts);
	}

	render() {
		console.log(this.state.lock);
		console.dev('render container!!!');
		let tabStyle = this.props.tabs,
			isEnd = this.props.news.listInfo['listLatest']['isEnd'],
			isLoadingShow = tabStyle === LATEST_NEWS;

		return (
	        <article className="cm-page">
	        	<Tab
	        		tabs={this.props.tabs}
	        		updateActiveTab={this.props.updateActiveTab}
	        	/>
	            <div className="cm-content">
	            	<Scroll 
	            			wrapper={".content-wrap"}
	            			ref="scroll"
	            			loadDataForScroll={this.loadDataForScroll}
	            			disable={this.state.lock}
	            	>
	            		<List 
							  tabs={this.props.tabs}
							  tabsType={LATEST_NEWS}
							  news={this.props.news.listLatest}
							  listInfo={this.props.news.listInfo.listLatest}
							  args={this.props.args}
							  likeNews={this.props.likeNews}
							  getNewsDetail={this.getNewsDetail}
							  details={this.props.details}
						/>
						<List 
							  tabs={this.props.tabs}
							  tabsType={LIKE_NEWS}
							  news={this.props.news.listLike}
							  listInfo={this.props.news.listInfo.listLike}
							  args={this.props.args}
							  dislikeNews={this.props.dislikeNews}
							  getNewsDetail={this.getNewsDetail}
							  details={this.props.details}
						/>
						<Loading isShow={isLoadingShow} isEnd={isEnd} />
	            	</Scroll>
	            </div>
	            <Spinner isShow={this.props.spinLoading}/>
	        </article>
		)
	}
}

Wrapper.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default Connect(Wrapper);