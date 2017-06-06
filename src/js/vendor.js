import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import {
  Table,
  Icon,
  Checkbox,
  Row,
  Col
} from 'antd';

import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/grid';
import 'echarts/lib/component/tooltip';

import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';

module.exports = {
  React,
  ReactDOM,
  PropTypes,
  Table,
  Icon,
  Checkbox,
  Row,
  Col,
  echarts,
  isEmpty,
  isNil
};
