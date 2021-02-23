
// 集成任务回显
export function nodeTypeImgIntegrate() {

}

// 挖掘任务回显
export function nodeTypeImg(type) {
  switch (type) {
    case 'EXCELinput':
      return 'static/rules/exinput.png'
    case 'desensitization':
      return 'static/rules/Transformation.png'
    case 'encode':
      return 'static/rules/Transformation.png'
    case 'decode':
      return 'static/rules/Transformation.png'
    case 'fuzzy':
      return 'static/rules/desensitization.png'
    case 'replace':
      return 'static/rules/desensitization.png'
    case 'supplemental':
      return 'static/rules/desensitization.png'
    case 'substring':
      return 'static/rules/desensitization.png'
    case 'constantComponent':
      return 'static/rules/desensitization.png'
    case 'varComponent':
      return 'static/rules/desensitization.png'  
    case 'tailoring':
      return 'static/rules/desensitization.png'
    case 'nullCheck':// 空值校验
      return 'static/rules/Transformation.png'
    case 'sql':// sql
      return 'static/rules/sql.png'
    case 'shellEdit':// shell
    return 'static/rules/Transformation.png'  
    case 'capitalization':// 大小写转换
      return 'static/rules/Transformation.png'
    case 'timeChange':// 时间格式转换
      return 'static/rules/Transformation.png'
    case 'typeChange':// 类型转换
      return 'static/rules/Transformation.png'
    case 'ranksChange':// 行转列
      return 'static/rules/Transformation.png'
    case 'columnChange':// 列转行
      return 'static/rules/Transformation.png'
    case 'switchCase':// switch-case
      return 'static/rules/Transformation.png'
    case 'javaScript':// JavaScript
      return 'static/rules/Transformation.png'
    case 'rangeChange':// 值域转换
      return 'static/rules/Transformation.png'
    case 'nullValueChecking':// 空值校验
      return 'static/rules/Transformation.png'
    case 'identityCard':// 身份证号码校验
      return 'static/rules/Transformation.png'
    case 'duplicateRemoval':
      return 'static/rules/removal.png'
    case 'filterData':
      return 'static/rules/filter.png'
    case 'regEx':
      return 'static/rules/rule.png'
    case 'dataCompare':
      return 'static/rules/Transformation.png'
    case 'TBinput':
      return 'static/rules/input.png'
    case 'TBoutput':
      return 'static/rules/TB-output.png'
    case 'outputFile':// 文件输出
      return 'static/rules/TB-output.png'
    case 'Foutput':
      return 'static/rules/TB-output.png'
    case 'ES-output':
      return 'static/rules/TB-output.png'
    case 'datasource':
      return 'static/rules/data source.png'
    case 'step':
      return 'static/rules/step.png'
    case 'rules':
      return 'static/rules/rule.png'
    case 'dominTransfer':
      return 'static/rules/Transformation.png'
    case 'dateTransfer':
      return 'static/rules/Transformation.png'
    case 'removal':
      return 'static/rules/removal.png'
    case 'sync':
      return 'static/rules/Data synchronization.png'
    case 'merge':
      return 'static/rules/merge.png'
    case 'tableMerge':
      return 'static/rules/merge.png'
    case 'split':
      return 'static/rules/split.png'
    case 'distribute':
      return 'static/rules/distribute.png'
    case 'SQLinput':
      return 'static/rules/SQL input.png'
    case 'interface':
      return 'static/rules/Interface.png'
    case 'Condition_udgment':
      return 'static/rules/Condition judgment.png'
    case 'completion':
      return 'static/rules/completion.png'
    case 'storedProcedure':
      return 'static/rules/sql.png'  
    case 'sqlEdit':
      return 'static/rules/Transformation.png'
    case 'python':
      return 'static/rules/Transformation.png'
    case 'feature':// 特征结构
      return 'static/rules/Transformation.png'
    case 'TStacking':// 表堆叠
      return 'static/rules/Transformation.png'
    case 'recordOption':// 记录选择
      return 'static/rules/Transformation.png'
    case 'TConnect':// 表连接
      return 'static/rules/Transformation.png'
    case 'addSequences':// 新增序列
      return 'static/rules/Transformation.png'
    case 'dataPartition':// 数据集划分
      return 'static/rules/Transformation.png'
    case 'typeConversion':// 类型转换
      return 'static/rules/Transformation.png'
    case 'missingValue':// 缺失值处理
      return 'static/rules/Transformation.png'
    case 'recordReduplication':// 记录去重
      return 'static/rules/Transformation.png'
    case 'abnormalProcessing':// 异常值处理
      return 'static/rules/Transformation.png'
    case 'dataStandard':// 数据标准化
      return 'static/rules/Transformation.png'
    case 'mathFunction':// 数学类函数
      return 'static/rules/Transformation.png'
    case 'dataSort':// 排序
      return 'static/rules/Transformation.png'
    case 'groupAggregation':// 分组聚合
      return 'static/rules/Transformation.png'
    case 'thirtyEightUUID':// 分组聚合
      return 'static/rules/Transformation.png'      
    case 'renameColumn':// 修改列名
      return 'static/rules/Transformation.png'
    case 'dataExploration':// 数据探索
      return 'static/rules/Transformation.png'
    case 'randomTest':// 纯随机性检验
      return 'static/rules/Transformation.png'
    case 'correlationAnalysis':// 相关性分析
      return 'static/rules/Transformation.png'
    case 'TtestSingle':// 单样本T检验
      return 'static/rules/Transformation.png'
    case 'normalityTest':// 正态性检验
      return 'static/rules/Transformation.png'
    case 'TtestDouble':// 双样本T检验
      return 'static/rules/Transformation.png'
    case 'principalComponent':// 主成分分析
      return 'static/rules/Transformation.png'
    case 'frequencyStatistic':// 频数统计
      return 'static/rules/Transformation.png'
    case 'fullTableStatistics':// 全表统计
      return 'static/rules/Transformation.png'
    case 'stationarityTest':// 平稳性检验
      return 'static/rules/Transformation.png'
    case 'factorAnalysis':// 因子分析
      return 'static/rules/Transformation.png'
    case 'squareTest':// 卡方检验
      return 'static/rules/Transformation.png'
    case 'CARTTree':// CART分类树
      return 'static/rules/Transformation.png'
    case 'ID3Tree':// ID3分类树
      return 'static/rules/Transformation.png'
    case 'neighborTree':// 最近邻分类树
      return 'static/rules/Transformation.png'
    case 'naiveBayes':// 朴素贝叶斯
      return 'static/rules/Transformation.png'
    case 'logisticRegression':// 逻辑回归
      return 'static/rules/Transformation.png'
    case 'supportVector':// 支持向量机
      return 'static/rules/Transformation.png'
    case 'multilayerPerception':// 多层感知
      return 'static/rules/Transformation.png'
    case 'CARTRegressionTree':// CART回归树
      return 'static/rules/Transformation.png'
    case 'LASSORegressionTree':// LASSO回归树
      return 'static/rules/Transformation.png'
    case 'linearRegression':// 线性回归
      return 'static/rules/Transformation.png'
    case 'VectorRegression':// 向量回归
      return 'static/rules/Transformation.png'
    case 'NeighborRegression':// 最邻近回归
      return 'static/rules/Transformation.png'
    case 'DBSCANDensity':// DBSCAN密度聚类
      return 'static/rules/Transformation.png'
    case 'KMeans':// KMeans
      return 'static/rules/Transformation.png'
    case 'hierarchicalClustering':// 层次聚类
      return 'static/rules/Transformation.png'
    case 'GMModel':// GM(1,1)
      return 'static/rules/Transformation.png'
    case 'Difference':// 差分
      return 'static/rules/Transformation.png'
    case 'ARIMA':// ARIMA
      return 'static/rules/Transformation.png'
    case 'modelAssessment':// 模型评估
      return 'static/rules/Transformation.png'
    case 'modelPrediction':// 模型预测
      return 'static/rules/Transformation.png'
    case 'orderCompare':// 模型预测
    return 'static/rules/Transformation.png'
  }
}
