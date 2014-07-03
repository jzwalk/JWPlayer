<?php
if (!defined('__TYPECHO_ROOT_DIR__')) exit;
/**
 * 嵌入HTML5+Flash视频播放器JW Player6
 * 
 * @package JWPlayer
 * @author 羽中
 * @version 1.0.5
 * @dependence 13.12.12-*
 * @link http://www.jzwalk.com
 */
class JWPlayer_Plugin implements Typecho_Plugin_Interface
{
	protected static $id = 0;
	/**
	 * 激活插件方法,如果激活失败,直接抛出异常
	 * 
	 * @access public
	 * @return void
	 * @throws Typecho_Plugin_Exception
	 */
	public static function activate()
	{
		Typecho_Plugin::factory('Widget_Abstract_Contents')->filter = array('JWPlayer_Plugin','jwfilter');
		Typecho_Plugin::factory('Widget_Abstract_Contents')->contentEx = array('JWPlayer_Plugin','jwparse');
		Typecho_Plugin::factory('Widget_Abstract_Contents')->excerptEx = array('JWPlayer_Plugin','jwparse');
		Typecho_Plugin::factory('Widget_Archive')->header = array('JWPlayer_Plugin','jwjs');
	}
	
	/**
	 * 禁用插件方法,如果禁用失败,直接抛出异常
	 * 
	 * @static
	 * @access public
	 * @return void
	 * @throws Typecho_Plugin_Exception
	 */
	public static function deactivate() {}
	
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
<div style="color:#999;font-size:0.92857em;font-weight:bold;"><p>
'._t('编辑文章或页面写入如%s文件地址%s发布即可. ','<span style="color:#467B96;">&lt;jw&gt;</span><span style="color:#E47E00;">','</span><span style="color:#467B96;">&lt;/jw&gt;</span>').'
'._t('多个文件地址可用%s号隔开. ','<span style="color:#467B96;">,</span>').'<br/>
'._t('末尾可继续附带下表参数, 用%s号隔开. 参数内对应多个文件设置也用%s号隔开. 例:','<span style="color:#467B96;">|</span>','<span style="color:#467B96;">,</span>').'</p>
<p><span style="color:#467B96;">&lt;jw&gt;</span><span style="color:#E47E00;">http://1.flv</span><span style="color:#467B96;">,</span><span style="color:#E47E00;">http://2.mp4</span><br/>
<span style="color:#467B96;">|</span><span style="color:#E47E00;">image=http://cover1.jpg<span style="color:#467B96;">,</span>http://ss2.jpg</span><br/>
<span style="color:#467B96;">|</span><span style="color:#E47E00;">title='._t('动物滑稽视频').'<span style="color:#467B96;">,</span>Thor2 Trailer</span><br/>
<span style="color:#467B96;">|</span><span style="color:#E47E00;">description='._t('我收藏的萌宠爆笑瞬间合辑').'<span style="color:#467B96;">,</span>Thor:The Dark World(2013) very cool!</span><br/>
<span style="color:#467B96;">|</span><span style="color:#E47E00;">listbar=right</span><span style="color:#467B96;">|</span><span style="color:#E47E00;">autostart=true</span><span style="color:#467B96;">&lt;/jw&gt;</span>
</p></div>
<style type="text/css">
table {
background:#FFF;
color:#666;
width:490px;
font-size:0.92857em;
border:2px solid #F0F0EC;
}
table td{
border-top:1px solid #F0F0EC;
padding:3px;
}
.param {
color:#E47E00;
font-weight:bold;
text-align:center;
}
.value {
color:#467B96;
font-weight:bold;
text-align:center;
}
</style>
<table>
<colgroup>
<col width="10%"/>
<col width="10%"/>
<col width="80%"/>
</colgroup>
<thead>
<tr>
<th>'._t('参数').'</th>
<th>'._t('默认').'</th>
<th>'._t('说明').'</th>
</tr>
</thead>
<tbody>
<tr>
<td class="param">image</td>
<td class="value">-</td>
<td>'._t('预览/封面图片, url地址. 播放音频将全程显示. ').'</td>
</tr>
<tr>
<td class="param">title</td>
<td class="value">-</td>
<td>'._t('标题文字, 可显示在播放按钮或播放列表中. ').'</td>
</tr>
<tr>
<td class="param">description</td>
<td class="value">-</td>
<td>'._t('描述文字, 可显示在完整条目的播放列表中. ').'</td>
</tr>
<tr>
<td class="param">tracks</td>
<td class="value">-</td>
<td>'._t('字幕文件, url地址. %s号分隔中英,支持WebVTT/SRT/DFXP. ','<span style="color:#467B96;font-weight:bold">;</span>').'</td>
</tr>
<tr>
<td class="param">width</td>
<td class="value">480</td>
<td>'._t('宽度, 整数或百分数. 如100%可配合宽高比参数自适应屏幕. ').'</td>
</tr>
<tr>
<td class="param">height</td>
<td class="value">270</td>
<td>'._t('高度, 整数. 如40为播放音频的合适高度. ').'</td>
</tr>
<tr>
<td class="param">aspectratio</td>
<td class="value">-</td>
<td>'._t('宽高比, 如%s. 与width参数同时指定时height参数无效. ','<span style="color:#467B96;font-weight:bold">16:9</span>').'</td>
</tr>
<tr>
<td class="param">listbar</td>
<td class="value">-</td>
<td>'._t('播放列表, 只能为%s(底部)或%s(右侧)显示. ','<span style="color:#467B96;font-weight:bold">bottom</span>','<span style="color:#467B96;font-weight:bold">right</span>').'</td>
</tr>
<tr>
<td class="param">autostart</td>
<td class="value">false</td>
<td>'._t('自动播放, 为%s时开启. 对移动端(iOS/Android)无效. ','<span style="color:#467B96;font-weight:bold">true</span>').'</td>
</tr>
<tr>
<td class="param">repeat</td>
<td class="value">false</td>
<td>'._t('重复播放, 为%s时开启. ','<span style="color:#467B96;font-weight:bold">true</span>').'</td>
</tr>
<tr>
<td class="param">mute</td>
<td class="value">false</td>
<td>'._t('静音, 为%s时开启. 对移动端(iOS/Android)无效. ','<span style="color:#467B96;font-weight:bold">true</span>').'</td>
</tr>
</tbody>
</table>
		';

		$skin = new Typecho_Widget_Helper_Form_Element_Select('skin',
		array(''=>_t('默认'),'six.xml'=>_t('艺术黑'),'five.xml'=>_t('商务白'),'beelden.xml'=>_t('古典红'),'bekle.xml'=>_t('运动蓝'),'glow.xml'=>_t('简约黑'),'roundster.xml'=>_t('时尚粉'),'stormtrooper.xml'=>_t('数码蓝'),'vapor.xml'=>_t('个性绿')),'',_t('皮肤风格选择'),_t('除默认外还可以选择8款Pro版官方定制皮肤'));
		$form->addInput($skin);

		$primary = new Typecho_Widget_Helper_Form_Element_Radio('primary',
		array(''=>_t('HTML5'),'flash'=>_t('Flash')),'',_t('优先嵌载模式'),_t('仅在优先模式不被支持时则自动调用另一种'));
		$form->addInput($primary);

		$stretch = new Typecho_Widget_Helper_Form_Element_Select('stretch',
		array('none'=>_t('固定'),''=>_t('缩放'),'fill'=>_t('裁切'),'exactfit'=>_t('拉伸')),'',_t('画面适应方法'),_t('视频尺寸与播放器尺寸不同时如何修正画面'));
		$form->addInput($stretch);

		$layout = new Typecho_Widget_Helper_Form_Element_Select('layout',
			array('basic'=>_t('精简'),''=>_t('完整')),'',_t('播放列表效果'),_t('完整显示图片、标题和描述, 精简只显示标题'));
		$form->addInput($layout);

		$lsize = new Typecho_Widget_Helper_Form_Element_Text('lsize',NULL,'180',_t('高(底部)/宽(右侧): '));
		$lsize->input->setAttribute('class','text-s');
		$lsize->label->setAttribute('style','position:absolute;color:#999;font-weight:normal;bottom:37px;left:62px;');
		$lsize->input->setAttribute('style','position:absolute;width:50px;bottom:40px;left:179px;');
		$lsize->setAttribute('style','list-style:none;position:relative;');
		$form->addInput($lsize);

		$tdefault = new Typecho_Widget_Helper_Form_Element_Select('tdefault',
		array(''=>_t('手动'),'cn'=>_t('中文'),'en'=>_t('英文')),'',_t('默认显示字幕'),_t('tracks文件设置时可指定初始自动显示的字幕'));
		$form->addInput($tdefault);

		$tsize = new Typecho_Widget_Helper_Form_Element_Text('tsize',NULL,'15',_t('字体大小: '));
		$tsize->input->setAttribute('class','text-s');
		$tsize->label->setAttribute('style','position:absolute;color:#999;font-weight:normal;bottom:37px;left:62px;');
		$tsize->input->setAttribute('style','position:absolute;width:50px;bottom:40px;left:127px;');
		$tsize->setAttribute('style','list-style:none;position:relative;');
		$form->addInput($tsize);

		$topac = new Typecho_Widget_Helper_Form_Element_Text('topac',NULL,'75',_t('背景透明度: '));
		$topac->input->setAttribute('class','text-s');
		$topac->label->setAttribute('style','position:absolute;color:#999;font-weight:normal;bottom:37px;left:184px;');
		$topac->input->setAttribute('style','position:absolute;width:50px;bottom:40px;left:263px;');
		$topac->setAttribute('style','list-style:none;position:relative;');
		$form->addInput($topac);

		$title = new Typecho_Widget_Helper_Form_Element_Radio('title',
		array(''=>_t('是'),'1'=>_t('否')),'',_t('按钮显示title'),_t('title文字设置时可在播放器中央的按钮上显示'));
		$form->addInput($title);

		$flback = new Typecho_Widget_Helper_Form_Element_Radio('flback',
		array(''=>_t('是'),'1'=>_t('否')),'',_t('缺省显示下载'),_t('flash和html5模式均不支持时可显示下载链接'));
		$form->addInput($flback);
	}
	/**
	 * 个人用户的配置面板
	 * 
	 * @access public
	 * @param Typecho_Widget_Helper_Form $form
	 * @return void
	 */
	public static function personalConfig(Typecho_Widget_Helper_Form $form) {}

	/**
	 * 头部js方法挂载
	 * 
	 * @return void
	 */
	public static function jwjs()
	{
		$url = Helper::options()->pluginUrl.'/JWPlayer/player/';
		echo '<script type="text/javascript" src="'.$url.'jwplayer.js"></script>';
	}

	/**
	 * MD兼容性过滤
	 * 
	 * @param array $value
	 * @return array
	 */
	public static function jwfilter($value)
	{
		//避免自动链接
		if ($value['isMarkdown']) {
			$value['text'] = preg_replace('/(?!<div>)<(jw)>(.*?)<\/\\1>(?!<\/div>)/is','<div><jw>\\2</jw></div>',$value['text']);
			//兼容AudioPlayer
			$value['text'] = preg_replace('/(?!<div>)\[(mp3)](.*?)\[\/\\1](?!<\/div>)/is','<div>[mp3]\\2[/mp3]</div>',$value['text']);
		}
		return $value;
	}

	/**
	 * 内容标签替换
	 * 
	 * @param string $content
	 * @return string
	 */
	public static function jwparse($content,$widget,$lastResult)
	{
		$content = empty($lastResult) ? $content : $lastResult;

		if ($widget instanceof Widget_Archive) {
			$content = preg_replace_callback('/<(jw)>(.*?)<\/\\1>/si',array('JWPlayer_Plugin','callback'),$content);
		}

		return $content;
	}

	/**
	 * 参数回调解析
	 * 
	 * @param array $matches
	 * @return string
	 */
	public static function callback($matches)
	{
		$atts = explode('|',$matches[2]);
		$settings = Helper::options()->plugin('JWPlayer');
		$data = array();
		
		//处理文件参数
		$file = array_shift($atts);
		if (strpos($file,'.rss')) {
			$data['playlist'] = $file;
		} else {
			$files = explode(',',$file);
			for ($i=0;$i<count($files);$i++) {
				//多画质
				$qfiles = explode(';',$files[$i]);
				for ($j=0;$j<count($qfiles);$j++) {
					$quality[$j]['file'] = $qfiles[$j];
				}
				//多文件
				if (count($files)>1) {
					if (count($qfiles)>1) {
						$lists[$i]['sources'] = $quality;
					} else {
						$lists[$i]['file'] = $files[$i];
					}
				//单文件
				} else {
					if (count($qfiles)>1) {
						$data['sources'] = $quality;
					} else {
						$data['file'] = $file;
					}
				}
			}
		}

		//处理信息参数
		$items = array('image','title','description');
		foreach ($atts as $att) {
			if (strpos($att,'=')) {
				$pair = explode('=',$att);
				$key = trim($pair[0]);
				$val = trim($pair[1]);
				if (in_array($key,$items)) {
					$vals = explode(',',$val);
					for ($i=0;$i<count($vals);$i++) {
						//多文件
						if (count($vals)>1) {
							$lists[$i][$key] = $vals[$i];
						//单文件
						} else {
							$data[$key] = $val;
						}
					}
				//处理字幕参数
				} elseif ($key == 'tracks') {
					$vals = explode(',',$val);
					for ($i=0;$i<count($vals);$i++) {
						//多字幕
						$tfiles = explode(';',$vals[$i]);
						for ($j=0;$j<count($tfiles);$j++) {
							$subs[$j]['file'] = $tfiles[$j];
						}
						//预设中英
						$subs[0]['label'] = '中文';
						if (!empty($subs[1]))
						$subs[1]['label'] = 'English';
						//默认显示
						if ($settings->tdefault == 'cn') {
							$subs[0]['default'] = 'true';
						}
						elseif ($settings->tdefault == 'en' && !empty($subs[1])) {
							$subs[1]['default'] = 'true';
						}
						if ($vals[$i]) {
							//多文件
							if (count($vals)>1) {
								$lists[$i]['tracks'] = $subs;
							//单文件
							} else {
								$data['tracks'] = $subs;
							}
						}
					}
				//处理列表参数
				} elseif ($key == 'listbar') {
					$data['listbar']['position'] = $val;
				} elseif ($key == 'listsize') {
					$data['listbar']['size'] = $val;
				} else {
					$data[$key] = $val;
				}
			}
		}
		if (!empty($lists))
			$data['playlist'] = $lists;

		return self::output($data);
	}

	/**
	 * 输出播放器实例
	 * 
	 * @param string $source
	 * @param array $options
	 * @return string
	 */
	public static function output($jwsets = array())
	{
		$options = Helper::options();
		$skinurl = $options->pluginUrl.'/JWPlayer/player/skins/';
		$settings = $options->plugin('JWPlayer');

		//插件设置
		if ($settings->skin) {
			$jwsets['skin'] = $skinurl.$settings->skin;
		}
		if ($settings->primary) {
			$jwsets['primary'] = 'flash';
		}
		if ($settings->stretch) {
			$jwsets['stretching'] = $settings->stretch;
		}
		if (!empty($jwsets['listbar']['position'])) {
			if ($settings->layout&&empty($jwsets['listbar']['layout'])) {
				$jwsets['listbar']['layout'] = $settings->layout;
			}
			if ($settings->lsize !== '180'&&empty($jwsets['listbar']['size'])) {
				$jwsets['listbar']['size'] = $settings->lsize;
			}
		}
		if ($settings->tsize !== '15') {
				$jwsets['captions']['fontSize'] = $settings->tsize;
		}
		if ($settings->topac !== '75') {
			$jwsets['captions']['backgroundOpacity'] = $settings->topac;
		}
		if ($settings->title) {
			$jwsets['displaytitle'] = 'false';
		}
		if ($settings->flback) {
			$jwsets['fallback'] = 'false';
		}

		//格式化参数
		$encode = class_exists('Json') ? Json::encode($jwsets) : json_encode($jwsets);

		//输出实例
		$ids = "jwplayer_".++self::$id;
		$output = '<div id="'.$ids.'">'._t('播放器载入中...').'</div>';
		$output .= '<script type="text/javascript">';
		$output .= 'jwplayer("'.$ids.'").setup('.$encode.');';
		$output .= '</script>';

		return $output;
	}

}
