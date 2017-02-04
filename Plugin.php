<?php
if (!defined('__TYPECHO_ROOT_DIR__')) exit;
/**
 * 为博客添加HTML5影音播放器JW Player
 * 
 * @package JWPlayer
 * @author 羽中
 * @version 1.0.6
 * @dependence 14.10.10
 * @link http://www.yzmb.me/archives/net/jwplayer-for-typecho
 */
class JWPlayer_Plugin implements Typecho_Plugin_Interface
{
	/**
	* 初始播放器ID
	* 
	* @access private
	* @var integer
	*/
	private static $id = 0;

	/**
	 * 激活插件方法,如果激活失败,直接抛出异常
	 * 
	 * @access public
	 * @return void
	 * @throws Typecho_Plugin_Exception
	 */
	public static function activate()
	{
		Typecho_Plugin::factory('Widget_Abstract_Contents')->contentEx = array('JWPlayer_Plugin','jwparse');
		Typecho_Plugin::factory('Widget_Abstract_Contents')->excerptEx = array('JWPlayer_Plugin','jwparse');
		Typecho_Plugin::factory('Widget_Abstract_Contents')->excerpt = array('JWPlayer_Plugin','txtparse');
	}

	/**
	 * 禁用插件方法,如果禁用失败,直接抛出异常
	 * 
	 * @static
	 * @access public
	 * @return void
	 * @throws Typecho_Plugin_Exception
	 */
	public static function deactivate(){}

	/**
	 * 获取插件配置面板
	 * 
	 * @access public
	 * @param Typecho_Widget_Helper_Form $form 配置面板
	 * @return void
	 */
	public static function config(Typecho_Widget_Helper_Form $form)
	{
		echo '
<div style="color:#999;font-size:13px;">
'._t('编辑文章或页面写入%s文件地址%s即可显示影音播放器, ','<span style="color:#467B96;font-weight:bold;">&lt;jw&gt;</span><span style="color:#444;font-weight:bold;">','</span><span style="color:#467B96;font-weight:bold;">&lt;/jw&gt;</span>').'
'._t('多个文件连播可用%s号隔开,','<span style="color:#467B96;font-weight:bold">,</span>').'<br/>
'._t('参数间用%s号隔开, 支持%s等[更多详见]. 示例','<span style="color:#467B96;font-weight:bold;">|</span>','<span style="color:#444;font-weight:bold;">width</span>(宽度)<span style="color:#444;font-weight:bold;">height</span>(高度)<span style="color:#444;font-weight:bold;">image</span>(封面)<span style="color:#444;font-weight:bold;">title</span>(标题)').'</div>
<div style="color:#444;font-size:13px;font-weight:bold;padding:5px 8px;width:223px;background:#E9E9E6;">
<span style="color:#467B96;">&lt;jw&gt;</span>http://ckxt.mp4<span style="color:#467B96;">,</span>http://mv.flv<span style="color:#467B96;">|</span><br/>
<span style="color:#467B96;">image=</span>http://图.jpg<span style="color:#467B96;">,</span>http://cover.png<span style="color:#467B96;">|</span><br/>
<span style="color:#467B96;">title=</span>刺客信条<span style="color:#467B96;">,</span>Video Music Awards<span style="color:#467B96;">|</span><br/>
<span style="color:#467B96;">autostart=</span>false<span style="color:#467B96;">|</span><br/>
<span style="color:#467B96;">repeat</span>=true<span style="color:#467B96;">&lt;/jw&gt;</span>
</div>
';

		$skin = new Typecho_Widget_Helper_Form_Element_Select('skin',
		array(''=>_t('默认'),'six'=>_t('艺术黑'),'five'=>_t('商务白'),'beelden'=>_t('古典红'),'bekle'=>_t('运动蓝'),'glow'=>_t('简约黑'),'roundster'=>_t('时尚粉'),'stormtrooper'=>_t('数码蓝'),'vapor'=>_t('个性绿')),'',_t('皮肤风格选择'));
		$form->addInput($skin);

		$stretch = new Typecho_Widget_Helper_Form_Element_Select('stretch',
		array('none'=>_t('固定'),''=>_t('缩放'),'fill'=>_t('裁切'),'exactfit'=>_t('拉伸')),'',_t('画面适应方法'),_t('视频尺寸与播放器尺寸不同时的修正方式'));
		$form->addInput($stretch);

		$info = new Typecho_Widget_Helper_Form_Element_Radio('info',
		array(1=>_t('是'),0=>_t('否')),0,_t('隐藏标题描述'),_t('是否在窗口显示title与description参数信息'));
		$form->addInput($info);

		$about = new Typecho_Widget_Helper_Form_Element_Radio('about',
		array(1=>_t('是'),0=>_t('否')),0,_t('提示原文链接'),_t('右击窗口时是否出现原文链接, 参数可覆盖'));
		$form->addInput($about);

		$tedge = new Typecho_Widget_Helper_Form_Element_Select('tedge',
		array(''=>_t('默认'),'dropshadow'=>_t('下阴影'),'depressed'=>_t('上阴影'),'uniform'=>_t('深描边'),'raised'=>_t('浅描边')),'',_t('外挂字幕效果'));
		$form->addInput($tedge);

		$tsize = new Typecho_Widget_Helper_Form_Element_Text('tsize',NULL,'15',_t('字体大小: '));
		$tsize->input->setAttribute('class','text-s');
		$tsize->label->setAttribute('style','position:absolute;color:#999;font-weight:normal;bottom:10px;left:82px');
		$tsize->input->setAttribute('style','position:absolute;width:47px;bottom:13px;left:145px');
		$tsize->setAttribute('style','position:relative');
		$form->addInput($tsize);

		$logo = new Typecho_Widget_Helper_Form_Element_Text('logo',
		NULL,'',_t('logo水印图片'),_t('填写完整的图片url, 24位透明png效果最佳'));
		$logo->input->setAttribute('class','w-60');
		$form->addInput($logo->addRule('url',_t('请输入合法的图片地址')));

		$llink = new Typecho_Widget_Helper_Form_Element_Text('llink',
		NULL,'',_t('logo链接地址'),_t('填写点击水印图片将跳转到的目标链接url'));
		$llink->input->setAttribute('class','w-60');
		$form->addInput($llink->addRule('url',_t('请输入合法的链接地址')));

		$lpos = new Typecho_Widget_Helper_Form_Element_Select('lpos',
		array(''=>_t('右上角'),'top-left'=>_t('左上角'),'bottom-right'=>_t('右下角'),'bottom-left'=>_t('左下角')),'',_t('logo显示位置'));
		$form->addInput($lpos);

		$margin = new Typecho_Widget_Helper_Form_Element_Text('margin',NULL,'8',_t('边距(margin值): '));
		$margin->input->setAttribute('class','text-s');
		$margin->label->setAttribute('style','position:absolute;color:#999;font-weight:normal;bottom:10px;left:82px');
		$margin->input->setAttribute('style','position:absolute;width:47px;bottom:13px;left:183px');
		$margin->setAttribute('style','position:relative');
		$form->addInput($margin);

		$hide = new Typecho_Widget_Helper_Form_Element_Checkbox('hide',
		array(1=>_t('自动隐藏')),NULL,'');
		$hide->label->setAttribute('style','position:absolute;color:#999;font-weight:normal;bottom:10px;left:244px');
		$hide->input->setAttribute('style','position:absolute;width:35px;bottom:4px;left:49px');
		$hide->setAttribute('style','position:relative');
		$form->addInput($hide);

		$share = new Typecho_Widget_Helper_Form_Element_Checkbox('share',
		array('weibo'=>_t('微博'),'txwb'=>_t('腾讯微博'),'tieba'=>_t('贴吧'),'douban'=>_t('豆瓣'),'renren'=>_t('人人'),'facebook'=>_t('Facebook'),'twitter'=>_t('Twitter')),NULL,_t('分享功能按钮'));
		$form->addInput($share);
	}

	/**
	 * 个人用户的配置面板
	 * 
	 * @access public
	 * @param Typecho_Widget_Helper_Form $form
	 * @return void
	 */
	public static function personalConfig(Typecho_Widget_Helper_Form $form){}

	/**
	 * 内容标签替换
	 * 
	 * @param string $content
	 * @return string
	 */
	public static function jwparse($content,$widget,$lastResult)
	{
		$content = empty($lastResult) ? $content : $lastResult;

		if ($widget instanceof Widget_Archive && !$widget->request->feed && false!==stripos($content,'<jw>')) {
			$content = preg_replace_callback('/<(jw)>(.*?)<\/\\1>/si',array('JWPlayer_Plugin','callback'),$content);
		}

		return $content;
	}

	/**
	 * 摘要文本替换
	 * 
	 * @param string $text
	 * @return string
	 */
	public static function txtparse($text,$widget,$lastResult)
	{
		$text = empty($lastResult) ? $text : $lastResult;

		if ($widget instanceof Widget_Archive && false!==stripos($text,'<jw>')) {
			$text = preg_replace('/<(jw)>(.*?)<\/\\1>/si',_t(' [影音片段: 请查看原文播放] '),$text);
		}

		return $text;
	}

	/**
	 * 参数回调解析
	 * 
	 * @param array $matche
	 * @return string
	 */
	public static function callback($matche)
	{
		$settings = Helper::options()->plugin('JWPlayer');
		$data = array();
		$lists = array();

		//过滤html标签
		$atts = explode('|',trim(Typecho_Common::stripTags($matche['2'])));
		$file = array_shift($atts);

		//处理地址设置
		if (preg_match("/(\.rss|\.json)/i",$file)) {
			$data['playlist'] = $file;
		} else {
			$files = explode(',',$file);
			$fnum = count($files);
			$qfiles = array();
			$qnum = '';
			$quality = array();

			for ($i=0;$i<$fnum;++$i) {
				if ($files[$i]) {
					$qfiles = explode(';',$files[$i]);
					$qnum = count($qfiles);

					//准备画质数组
					for ($j=0;$j<$qnum;++$j) {
						$quality[$j]['file'] = $qfiles[$j];
					}
				}

				//多文件参数
				if ($fnum>1) {
					if ($qnum>1) {
						$lists[$i]['sources'] = $quality;
					} else {
						$lists[$i]['file'] = $files[$i];
					}
				}
			}

			//单文件参数
			if ($fnum<=1) {
				if ($qnum>1) {
					$data['sources'] = $quality;
				} else {
					$data['file'] = $file;
				}
			}

			if (preg_match("/(\.m3u8|\.mpd|rtmp:\/\/)/i",$file)) {
				$data['localization']['liveBroadcast'] = _t('在线直播');
			}
		}

		if (array_filter($atts)) {
			$pair = array();
			$key = '';
			$val = '';
			$vals = array();
			$vnum = '';
			$tfiles = array();
			$subs = array();

			foreach ($atts as $att) {
				if (strpos($att,'=')) {
					$pair = explode('=',$att);
					$key = trim($pair['0']);
					$val = trim($pair['1']);

					//处理列表设置
					if (in_array($key,array('image','title','description','tracks')) && $val) {
						$vals = explode(',',$val);
						$vnum = count($vals);

						for ($i=0;$i<$vnum;++$i) {
							if ($key=='tracks' && $vals[$i]) {
								$tfiles = explode(';',$vals[$i]);

								//准备语种数组
								for ($j=0;$j<count($tfiles);++$j) {
									$subs[$j]['file'] = $tfiles[$j];
								}

								//多文件参数
								if ($vnum>1) {
									$lists[$i]['tracks'] = $subs;
								}
							} elseif ($vnum>1) {
								$lists[$i][$key] = $vals[$i];
							}
						}

						if ($key=='tracks') {
							//预设中英字幕
							$subs['0']['label'] = '中文';
							if (isset($subs['1'])) {
								$subs['1']['label'] = 'English';
							}

							//字幕插件设置
							if ($settings->tsize!=='15') {
								$data['captions']['fontSize'] = $settings->tsize;
							}
							if ($settings->tedge) {
								$data['captions']['backgroundOpacity'] = '0';
								$data['captions']['edgeStyle'] = $settings->tedge;
							}

							//单文件参数
							if ($vnum<=1) {
								$data['tracks'] = $subs;
							}
						} elseif ($vnum<=1) {
							$data[$key] = $val;
						}

					//处理其他设置
					} else {
						$data[$key] = $val;
					}
				}
			}
		}

		if ($lists) {
			$data['playlist'] = $lists;
			$data['localization']['playlist'] = _t('播放列表');
			$data['localization']['nextUp'] = _t('接下来是');
		}

		return self::output($data,true);
	}

	/**
	 * 输出播放器实例
	 * 
	 * @param array $jwsets 参数设置
	 * @param boolean $iscall 是否回调
	 * @return void
	 */
	public static function output($jwsets=array(),$iscall=false)
	{
		$url = Helper::options()->pluginUrl.'/JWPlayer/player/';
		$jwsets = Json::encode(array_merge($jwsets,self::getsets()));
		$ids = "jwplayer_".++self::$id;

		//播放器实例代码
		$output = '<script type="text/javascript">//<![CDATA[
	window.jwplayer || document.write("<script type=\"text/javascript\" src=\"'.$url.'jwplayer.js\"><\/script>")//]]></script>';
		$output .= '<script type="text/javascript">jwplayer.defaults = {"base":"'.$url.'"};</script>';
		$output .= '<div id="'.$ids.'">'._t('播放器载入中...').'</div>';
		$output .= '<script type="text/javascript">jwplayer("'.$ids.'").setup('.$jwsets.');</script>';

		//模版输出判断
		if ($iscall) {
			return $output;
		} else {
			echo $output;
		}
	}

	/**
	 * 输出插件设置
	 * 
	 * @return string
	 */
	public static function getsets()
	{
		$settings = Helper::options()->plugin('JWPlayer');
		$share = $settings->share;
		$archive = Typecho_Widget::widget('Widget_Archive');
		$url = $archive->permalink;
		$sets = array();

		if ($settings->skin) {
			$skin = $settings->skin;
			$sets['skin'] = array('name'=>$skin);
		}
		if ($settings->stretch) {
			$sets['stretching'] = $settings->stretch;
		}
		if ($settings->info) {
			$sets['displaytitle'] = 'false';
			$sets['displaydescription'] = 'false';
		}
		if ($settings->about) {
			$sets['abouttext'] = _t('原文链接: ').$archive->title;
			$sets['aboutlink'] = $url;
		}
		if ($share) {
			$sets['sharing']['heading'] = _t('分享到');
			$sets['sharing']['link'] = $url;
			$sets['sharing']['sites'] = array_merge(array('email'),$share);
		}

		$logo = $settings->logo;
		$llink = $settings->llink;
		$lops = $settings->lpos;
		$margin = $settings->margin;
		if ($logo) {
			$sets['logo']['file'] = $logo;
			if ($llink) {
				$sets['logo']['link'] = $llink;
			}
			if ($lops) {
				$sets['logo']['position'] = $lops;
			}
			if ($margin!=='8') {
				$sets['logo']['margin'] = $margin;
			}
			if ($settings->hide) {
				$sets['logo']['hide'] = true;
			}
		}

		return $sets;
	}

}
