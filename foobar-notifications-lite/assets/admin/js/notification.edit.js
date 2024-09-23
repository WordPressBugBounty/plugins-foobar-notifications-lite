"use strict";

(function (_, _utils, _is) {
  _utils.ready(function ($) {
    //when a foobar shortcode is clicked on
    $('.foobar-shortcode').on('click', function () {
      try {
        //select the contents
        this.select(); //copy the selection

        document.execCommand('copy'); //show the copied message

        $(this).siblings('.foobar-shortcode-message').show();
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log('Oops, unable to copy!');
      }
    });
  }); // eslint-disable-next-line no-undef

})(FooBar, FooBar.utils, FooBar.utils.is);
"use strict";
"use strict";

(function ($, _, _f, _utils, _is) {
  _.IconPicker = _.Field.extend({
    construct: function construct(content, element, options, classes, i18n) {
      var self = this;

      self._super(content, element, options, classes, i18n);

      self.$doc = $(document);
      self.initial = self.$value.val();
      self.hasDefault = !_is.empty(self.opt.default);
      self.$container = $('<div/>', {
        'class': self.cls.container
      });
      self.containerElement = self.$container.get(0);
      self.$button = $('<button/>', {
        'class': 'button ' + self.cls.button,
        type: 'button'
      });
      self.$clear = $('<button/>', {
        'class': 'button button-small ' + self.cls.clear,
        type: 'button',
        text: self.hasDefault ? self.i18n.default : self.i18n.clear
      });
      self.$icon = $('<span/>', {
        'class': self.cls.icon
      });
      self.$text = $('<span/>', {
        'class': self.cls.text,
        text: self.i18n.select
      });
      self.$list = $('<div/>', {
        'class': self.cls.list
      });
      self.$selected = $();
      self.icons = _f.icons.all();
    },
    setup: function setup() {
      var self = this;

      if (!_is.empty(self.icons)) {
        self.$container.append(self.$button.append(self.$icon, self.$text), self.$clear, self.$list.append(self.createItems()));
        self.$button.on('click', {
          self: self
        }, self.onButtonClick);
        self.$clear.on('click', {
          self: self
        }, self.onClearClick);
        self.$list.on('click', self.sel.item, {
          self: self
        }, self.onItemClick);
        self.$value.addClass(self.cls.hidden).after(self.$container);
        self.val(self.$value.val());
      }
    },
    createItems: function createItems() {
      var self = this;
      return Object.keys(self.icons).map(function (name) {
        return $('<button/>', {
          'class': self.cls.item,
          'title': name,
          type: 'button'
        }).append(self.icons[name].cloneNode(true));
      });
    },
    teardown: function teardown() {
      var self = this;
      self.$value.removeClass(self.cls.hidden);
      self.$container.remove();
      self.$doc.off('click.' + self.id, self.onDocumentClick);
      self.$button.off('click', {
        self: self
      }, self.onButtonClick);
      self.$clear.off('click', {
        self: self
      }, self.onClearClick);
      self.$list.off('click', self.sel.item, {
        self: self
      }, self.onItemClick);
    },
    val: function val(value) {
      var self = this;

      if (_is.undef(value)) {
        return self.$value.val();
      }

      var oldValue = self.$value.val();
      var newValue = '';

      if (_is.string(value) && self.icons.hasOwnProperty(value)) {
        newValue = value;
        self.$selected = self.$list.find('[title="' + newValue + '"]');
        self.$value.val(newValue);
        self.$icon.empty().append(self.icons[newValue].cloneNode(true));
      } else {
        self.$selected = $();
        self.$value.val(newValue);
        self.$icon.empty();
      }

      self.$list.find(self.sel.selected).removeClass(self.cls.selected);
      self.$selected.addClass(self.cls.selected);

      if (oldValue !== newValue) {
        self.doValueChanged();
      }
    },
    toggleDropdown: function toggleDropdown(state) {
      var self = this;
      self.dropdownVisible = _is.boolean(state) ? state : !self.dropdownVisible;

      if (self.dropdownVisible) {
        self.$container.addClass(self.cls.visible);
        var list = self.$list.get(0);

        if (self.$selected.length !== 0) {
          var selectedElement =
          /** @type {HTMLElement}  */
          self.$selected.get(0);
          list.scrollTo(0, selectedElement.offsetTop);
        } else {
          list.scrollTo(0, 0);
        }

        self.$doc.on('click.' + self.id, {
          self: self
        }, self.onDocumentClick);
      } else {
        self.$doc.off('click.' + self.id, self.onDocumentClick);
        self.$container.removeClass(self.cls.visible);
      }
    },
    onDocumentClick: function onDocumentClick(e) {
      var self = e.data.self;

      if (!$.contains(self.containerElement, e.target)) {
        self.toggleDropdown(false);
      }
    },
    onButtonClick: function onButtonClick(e) {
      e.preventDefault();
      var self = e.data.self;
      self.toggleDropdown();
    },
    onClearClick: function onClearClick(e) {
      e.preventDefault();
      var self = e.data.self;
      self.val(self.hasDefault ? self.opt.default : '');
    },
    onItemClick: function onItemClick(e) {
      var self = e.data.self;
      self.val(this.title);
    }
  });

  _.fields.register('icon-picker', _.IconPicker, '.foofields-type-icon-picker', {
    default: null
  }, {
    container: 'fip-container',
    button: 'fip-button',
    clear: 'fip-clear',
    icon: 'fip-icon',
    text: 'fip-text',
    list: 'fip-list',
    item: 'fip-item',
    hidden: 'fip-hidden',
    visible: 'fip-visible',
    selected: 'fip-selected',
    sr: 'fip-sr'
  }, {
    select: 'Select Icon',
    clear: 'Clear',
    default: 'Default'
  });
})(FooFields.$, FooFields, FooBar, FooFields.utils, FooFields.utils.is);
"use strict";

(function ($, _, _is, _fn, _obj) {
  _.Numeric = _.Field.extend({
    setup: function setup() {
      var self = this;
      self.currentValue = self.val();
      self.debouncedId = null;
      self.$change.off("change", self.onValueChanged).on('input.foofields', {
        self: self
      }, self.onInputChange);
    },
    teardown: function teardown() {
      var self = this;
      clearTimeout(self.debouncedId);
      self.$change.off('.foofields');
    },
    onInputChange: function onInputChange(e) {
      var self = e.data.self,
          val = self.val();

      if (val !== self.currentValue) {
        self.currentValue = val;
        self.doValueChanged();
      }
    }
  });

  _.fields.register("numeric", _.Numeric, ".foofields-type-numeric", {}, {}, {});
})(FooFields.$, FooFields, FooFields.utils.is, FooFields.utils.fn, FooFields.utils.obj);
"use strict";

(function ($, _, _is, _fn, _obj) {
  _.DateTime = _.Field.extend({
    setup: function setup() {
      var self = this;
      self.$date = self.$input.find('input[type="date"]');
      self.$hours = self.$input.find('.foofields-time-hours').find('input[type="number"]');
      self.$minutes = self.$input.find('.foofields-time-minutes').find('input[type="number"]');
      self.currentValue = self.val();
      self.$change.off("change", self.onValueChanged).on('input.foofields', {
        self: self
      }, self.onInputChange);
    },
    teardown: function teardown() {
      var self = this;
      self.$change.off('.foofields');
    },
    val: function val(value) {
      var self = this,
          dateString = self.$date.val(),
          hours = self.$hours.val(),
          minutes = self.$minutes.val(),
          current = new Date(dateString);
      current.setHours(hours, minutes);
      var timestamp = current.getTime();

      if (_is.number(value) && value !== timestamp) {
        var date = new Date(value);
        self.$date.val(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate());
        self.$hours.val(date.getHours());
        self.$minutes.val(date.getMinutes());
        self.doValueChanged();
      } else {
        return current.getTime();
      }
    },
    onInputChange: function onInputChange(e) {
      var self = e.data.self,
          val = self.val();

      if (val !== self.currentValue) {
        self.currentValue = val;
        self.doValueChanged();
      }
    }
  });

  _.fields.register("datetime", _.DateTime, ".foofields-type-datetime", {}, {}, {});
})(FooFields.$, FooFields, FooFields.utils.is, FooFields.utils.fn, FooFields.utils.obj);
"use strict";

(function ($, _, _is, _fn, _obj) {
  _.TimeSelector = _.Field.extend({
    setup: function setup() {
      var self = this;
      self.SECOND_IN_MS = 1000;
      self.MINUTE_IN_MS = 60 * self.SECOND_IN_MS;
      self.HOUR_IN_MS = 60 * self.MINUTE_IN_MS;
      self.DAY_IN_MS = 24 * self.HOUR_IN_MS;
      self.$days = self.$input.find('.foofields-time-days').find('input[type="number"]');
      self.$hours = self.$input.find('.foofields-time-hours').find('input[type="number"]');
      self.$minutes = self.$input.find('.foofields-time-minutes').find('input[type="number"]');
      self.$seconds = self.$input.find('.foofields-time-seconds').find('input[type="number"]');
      self.currentValue = self.val();
      self.$change.off("change", self.onValueChanged).on('input.foofields', {
        self: self
      }, self.onInputChange);
    },
    teardown: function teardown() {
      var self = this;
      self.$change.off('.foofields');
    },
    val: function val(value) {
      var self = this,
          days = self.$days.val(),
          hours = self.$hours.val(),
          minutes = self.$minutes.val(),
          seconds = self.$seconds.val(),
          current = days * self.DAY_IN_MS + hours * self.HOUR_IN_MS + minutes * self.MINUTE_IN_MS + seconds * self.SECOND_IN_MS;

      if (_is.number(value) && value !== current) {
        var remaining = {
          days: Math.floor(value / self.DAY_IN_MS),
          hours: Math.floor(value % self.DAY_IN_MS / self.HOUR_IN_MS),
          minutes: Math.floor(value % self.HOUR_IN_MS / self.MINUTE_IN_MS),
          seconds: Math.floor(value % self.MINUTE_IN_MS / self.SECOND_IN_MS),
          milliseconds: value
        };
        self.$days.val(remaining.days);
        self.$hours.val(remaining.hours);
        self.$minutes.val(remaining.minutes);
        self.$seconds.val(remaining.seconds);
        self.doValueChanged();
      } else {
        return current;
      }
    },
    onInputChange: function onInputChange(e) {
      var self = e.data.self,
          val = self.val();

      if (val !== self.currentValue) {
        self.currentValue = val;
        self.doValueChanged();
      }
    }
  });

  _.fields.register("time-selector", _.TimeSelector, ".foofields-type-time-selector", {}, {}, {});
})(FooFields.$, FooFields, FooFields.utils.is, FooFields.utils.fn, FooFields.utils.obj);
"use strict";

(function ($, _, _is, _obj) {
  _.Conditions = _.Field.extend({
    construct: function construct(content, element, options, classes, i18n) {
      var self = this;

      self._super(content, element, options, classes, i18n);

      self.$addButton = self.$input.children(self.sel.add);
      self.$table = self.$input.children('table').first();
      self.$tbody = self.$table.children('tbody').first();
      self.$template = self.$table.children('tfoot').first().children('tr').first();
      self.rows = self.$tbody.children('tr').map(function (i, el) {
        return new _.Conditions.Row(self, el);
      }).get();
    },
    init: function init() {
      var self = this;

      self._super();

      self.$addButton.on('click.foofields', {
        self: self
      }, self.onAddNewClick);
      self.rows.forEach(function (row) {
        row.init();
      });
      var original;
      self.$tbody.sortable({
        cancel: ':input',
        forcePlaceholderSize: true,
        placeholder: 'foofields-conditions-placeholder',
        items: '> tr',
        distance: 5,
        start: function start(e, ui) {
          original = ui.item.index();
          ui.placeholder.height(ui.item.height());
        },
        update: function update(e, ui) {
          var current = ui.item.index(),
              from = original < current ? original : current;
          self.$tbody.children('tr').eq(from).nextAll('tr').andSelf().trigger('index-change');
        }
      });

      if (self.rows.length === 0) {
        self.addNewRow();
      }
    },
    destroy: function destroy() {
      var self = this;
      self.$tbody.sortable("destroy");
      self.rows.forEach(function (row) {
        row.destroy();
      });
      self.$addButton.off('.foofields');

      self._super();
    },
    addNewRow: function addNewRow() {
      var self = this,
          row = new _.Conditions.Row(self, self.$template.clone()); // add the row to the collection for later use

      self.rows.push(row);
      self.$tbody.append(row.$el).sortable("refresh");
      row.init(true); // row.enable();
      // always remove the empty class when adding a row, jquery internally checks if it exists

      self.$el.removeClass(self.cls.empty);
      self.doValueChanged();
      return row;
    },
    remove: function remove(row) {
      var self = this,
          $after = row.$el.nextAll('tr');
      row.$el.remove();
      var i = self.rows.indexOf(row);

      if (i !== -1) {
        self.rows.splice(i, 1);
      } //check if no rows are left


      if (self.rows.length === 0) {
        if (self.opt.allowEmpty) {
          self.$el.addClass(self.cls.empty);
        } else {
          self.addNewRow();
        }
      } else {
        self.$tbody.sortable("refresh");
        $after.trigger('index-change');
        self.doValueChanged();
      }
    },
    onAddNewClick: function onAddNewClick(e) {
      e.preventDefault();
      e.stopPropagation();
      e.data.self.addNewRow();
    },
    toggle: function toggle(state) {
      this._super(state);

      this.$template.find(":input").attr("disabled", "disabled");
    },
    val: function val(value) {
      var self = this;

      if (_is.array(value)) {
        self.rows.forEach(function (row, i) {
          row.val(i < value.length ? value[i] : []);
        });
        return;
      }

      return self.rows.map(function (row) {
        return row.val();
      });
    }
  });

  _.fields.register("conditions", _.Conditions, ".foofields-type-conditions", {
    allowEmpty: false
  }, {
    add: "foofields-conditions-add",
    empty: "foofields-empty"
  }, {});
})(FooFields.$, FooFields, FooFields.utils.is, FooFields.utils.obj);
"use strict";

(function ($, _, _utils, _is, _obj) {
  _.Conditions.Row = _.Component.extend({
    construct: function construct(parent, el) {
      var self = this;

      self._super(parent.instance, el, parent.cls, parent.sel);

      self.parent = parent;
      self.ctnr = parent.ctnr;
      self.$cells = self.$el.children('td,th');
      self.fields = self.$cells.children(self.sel.el).map(function (i, el) {
        return _.fields.create(self, el);
      }).get();
      self.regex = {
        id: /(_)-?\d+(_|-?)/i,
        name: /(\[)-?\d+(])/i
      };
    },
    init: function init(reindex) {
      var self = this;

      self._super();

      self.$el.on('index-change.foofields', {
        self: self
      }, self.onIndexChange);
      self.fields.forEach(function (field) {
        field.on("change", self.onFieldChange, self);
        field.init();
      });
      if (reindex) self.reindex();
    },
    destroy: function destroy() {
      var self = this;
      self.fields.forEach(function (field) {
        field.off("change", self.onFieldChange, self);
        field.destroy();
      });

      self._super();
    },
    remove: function remove() {
      var self = this;
      self.parent.remove(self);
    },
    reindex: function reindex() {
      var self = this,
          index = self.$el.index();
      self.fields.forEach(function (field) {
        field.id = self.update(field.$el, index);
        field.$el.find("[id],[name]").each(function (i, el) {
          self.update(el, index);
        });
      });
      self.trigger('index-change', [index]);
    },
    update: function update(el, index) {
      el = _is.jq(el) ? el : $(el);
      var id = el.prop('id');

      if (_is.string(id)) {
        var newId = id.replace(this.regex.id, '$1' + index + '$2');

        if (newId !== id) {
          el.prop('id', newId);
          id = newId;
        }
      }

      var name = el.prop('name');

      if (_is.string(name)) {
        var newName = name.replace(this.regex.name, '$1' + index + '$2');

        if (newName !== name) {
          el.prop('name', newName);
        }
      }

      return id;
    },
    field: function field(id) {
      return _utils.find(this.fields, function (field) {
        return field.id === id;
      });
    },
    onIndexChange: function onIndexChange(e) {
      e.data.self.reindex();
    },
    onFieldChange: function onFieldChange() {
      this.parent.doValueChanged();
    },
    enable: function enable() {
      this.fields.forEach(function (field) {
        field.enable();
      });
    },
    val: function val(value) {
      var self = this,
          fields = self.fields.filter(function (field) {
        return !(field instanceof _.Conditions.RowIndex);
      });

      if (_is.array(value)) {
        fields.forEach(function (field, i) {
          field.val(i < value.length ? value[i] : '');
        });
        return;
      }

      return fields.map(function (field) {
        return field.val();
      });
    }
  });
})(FooFields.$, FooFields, FooFields.utils, FooFields.utils.is, FooFields.utils.obj);
"use strict";

(function ($, _, _is, _str) {
  _.Conditions.RowIndex = _.Field.extend({
    setup: function setup() {
      this.content.on("index-change", this.onIndexChange, this);
    },
    teardown: function teardown() {
      this.content.off("index-change");
    },
    onIndexChange: function onIndexChange(e, index) {
      this.$input.text(_str.format(this.opt.format, {
        index: index,
        count: index + 1
      }));
    }
  });

  _.fields.register("conditions-index", _.Conditions.RowIndex, ".foofields-type-conditions-index", {
    format: "{count}"
  }, {}, {});
})(FooFields.$, FooFields, FooFields.utils.is, FooFields.utils.str);
"use strict";

(function ($, _, _is, _obj) {
  _.Conditions.Group = _.Field.extend({
    construct: function construct(content, element, options, classes, i18n) {
      var self = this;

      self._super(content, element, options, classes, i18n);

      self.$addButton = self.$input.children(self.sel.add);
      self.$removeButton = self.$input.children(self.sel.remove);
      self.$table = self.$input.children('table').first();
      self.$tbody = self.$table.children('tbody').first();
      self.$template = self.$table.children('tfoot').first().children('tr').first();
      self.rows = self.$tbody.children('tr').map(function (i, el) {
        return new _.Conditions.Group.Row(self, el);
      }).get();
    },
    init: function init() {
      var self = this;

      self._super();

      self.$addButton.on('click.foofields', {
        self: self
      }, self.onAddNewClick);
      self.$removeButton.on('click.foofields', {
        self: self
      }, self.onRemoveClick);
      self.rows.forEach(function (row) {
        row.init();
      });
      var original;
      self.$tbody.sortable({
        cancel: ':input',
        forcePlaceholderSize: true,
        placeholder: 'foofields-conditions-group-placeholder',
        items: '> tr',
        distance: 5,
        start: function start(e, ui) {
          original = ui.item.index();
          ui.placeholder.height(ui.item.height());
        },
        update: function update(e, ui) {
          var current = ui.item.index(),
              from = original < current ? original : current;
          self.$tbody.children('tr').eq(from).nextAll('tr').andSelf().trigger('index-change');
        }
      });

      if (self.rows.length === 0) {
        self.addNewRow();
      }
    },
    destroy: function destroy() {
      var self = this;
      self.$tbody.sortable("destroy");
      self.rows.forEach(function (row) {
        row.destroy();
      });
      self.$addButton.off('.foofields');

      self._super();
    },
    addNewRow: function addNewRow(after) {
      var self = this,
          row = new _.Conditions.Group.Row(self, self.$template.clone()); // add the row to the collection

      if (after instanceof _.Conditions.Group.Row) {
        self.rows.push(row);
        after.$el.after(row.$el);
      } else {
        self.rows.push(row);
        self.$tbody.append(row.$el);
      }

      self.$tbody.sortable("refresh");
      row.init(true); // always remove the empty class when adding a row, jquery internally checks if it exists

      self.$el.removeClass(self.cls.empty);
      self.doValueChanged();
      return row;
    },
    remove: function remove(row) {
      var self = this;

      if (row instanceof _.Conditions.Group.Row) {
        var $after = row.$el.nextAll('tr');
        row.$el.remove();
        var i = self.rows.indexOf(row);

        if (i !== -1) {
          self.rows.splice(i, 1);
        } //check if no rows are left


        if (self.rows.length === 0) {
          if (self.opt.allowEmpty) {
            self.$el.addClass(self.cls.empty);
          } else {
            self.content.remove();
          }
        } else {
          self.$tbody.sortable("refresh");
          $after.trigger('index-change');
          self.doValueChanged();
        }
      } else {
        self.content.remove();
      }
    },
    index: function index() {
      var self = this;
      return self.content.$el.index();
    },
    onAddNewClick: function onAddNewClick(e) {
      e.preventDefault();
      e.stopPropagation();
      e.data.self.addNewRow();
    },
    onRemoveClick: function onRemoveClick(e) {
      e.preventDefault();
      e.stopPropagation();
      e.data.self.remove();
    },
    toggle: function toggle(state) {
      this._super(state);

      this.$template.find(":input").attr("disabled", "disabled");
    },
    val: function val(value) {
      var self = this;

      if (_is.array(value)) {
        self.rows.forEach(function (row, i) {
          row.val(i < value.length ? value[i] : []);
        });
        return;
      }

      return self.rows.map(function (row) {
        return row.val();
      });
    }
  });

  _.fields.register("conditions-group", _.Conditions.Group, ".foofields-type-conditions-group", {
    allowEmpty: false
  }, {
    add: "foofields-conditions-group-empty-add",
    remove: "foofields-conditions-group-empty-remove",
    empty: "foofields-empty",
    types: "foofields-conditions-group-types",
    operators: "foofields-conditions-group-operators",
    values: "foofields-conditions-group-values"
  }, {});
})(FooFields.$, FooFields, FooFields.utils.is, FooFields.utils.obj);
"use strict";

(function ($, _, _utils, _is, _obj) {
  _.Conditions.Group.Row = _.Component.extend({
    construct: function construct(parent, el) {
      var self = this;

      self._super(parent.instance, el, parent.cls, parent.sel);

      self.parent = parent;
      self.ctnr = parent.ctnr;
      self.$cells = self.$el.children('td,th');
      self.fields = self.$cells.children(self.sel.el).map(function (i, el) {
        return _.fields.create(self, el);
      }).get();
      self.regex = {
        id: /(_)-?\d+(_|-?)/ig,
        name: /(\[)-?\d+(])/ig
      };
      self.types = _utils.find(self.fields, function (field) {
        return field.$el.hasClass(self.cls.types);
      });
      self.operators = _utils.find(self.fields, function (field) {
        return field.$el.hasClass(self.cls.operators);
      });
      self.values = _utils.find(self.fields, function (field) {
        return field.$el.hasClass(self.cls.values);
      });
      self.changed = false;
    },
    init: function init(reindex) {
      var self = this;

      self._super();

      self.$el.on('index-change.foofields', {
        self: self
      }, self.onIndexChange);
      self.fields.forEach(function (field) {
        field.on("change", self.onFieldChange, self);
        field.init();
      });
      if (reindex) self.reindex();
    },
    destroy: function destroy() {
      var self = this;
      self.fields.forEach(function (field) {
        field.off("change", self.onFieldChange, self);
        field.destroy();
      });

      self._super();
    },
    remove: function remove() {
      var self = this;
      self.parent.remove(self);
    },
    addNewRow: function addNewRow() {
      var self = this;
      self.parent.addNewRow(self);
    },
    reindex: function reindex() {
      var self = this,
          groupIndex = self.parent.index(),
          index = self.$el.index();
      self.fields.forEach(function (field) {
        field.id = self.update(field.$el, groupIndex, index);
        field.$el.find("[id],[name]").each(function (i, el) {
          self.update(el, groupIndex, index);
        });
      });
      self.trigger('index-change', [index]);
    },
    update: function update(el, groupIndex, index) {
      el = _is.jq(el) ? el : $(el);
      var id = el.prop('id'),
          first = true;

      if (_is.string(id)) {
        first = true;
        var newId = id.replace(this.regex.id, function (match, prefix, suffix) {
          if (first === true) {
            first = false;
            return prefix + groupIndex + suffix;
          }

          return prefix + index + suffix;
        });

        if (newId !== id) {
          el.prop('id', newId);
          id = newId;
        }
      }

      var name = el.prop('name');

      if (_is.string(name)) {
        first = true;
        var newName = name.replace(this.regex.name, function (match, prefix, suffix) {
          if (first === true) {
            first = false;
            return prefix + groupIndex + suffix;
          }

          return prefix + index + suffix;
        });

        if (newName !== name) {
          el.prop('name', newName);
        }
      }

      return id;
    },
    field: function field(id) {
      return _utils.find(this.fields, function (field) {
        return field.id === id;
      });
    },
    onIndexChange: function onIndexChange(e) {
      e.data.self.reindex();
    },
    onFieldChange: function onFieldChange() {
      var self = this;
      self.changed = true;
      self.parent.doValueChanged();
    },
    enable: function enable() {
      this.fields.forEach(function (field) {
        field.enable();
      });
    },
    val: function val(value) {
      var self = this,
          fields = self.fields.filter(function (field) {
        return !(field instanceof _.Conditions.Group.RowIndex) && !(field instanceof _.Conditions.Group.DeleteButton);
      });

      if (_is.array(value)) {
        fields.forEach(function (field, i) {
          field.val(i < value.length ? value[i] : '');
        });
        return;
      }

      return fields.map(function (field) {
        return field.val();
      });
    },
    getType: function getType() {
      var self = this;

      if (self.types instanceof _.Field) {
        return self.types.val();
      }

      return null;
    },
    getTypeOptions: function getTypeOptions() {
      var self = this;

      if (self.types instanceof _.Field) {
        return self.types.$el.find(':selected').data('selectize') || {};
      }

      return {};
    },
    getOperator: function getOperator() {
      var self = this;

      if (self.operators instanceof _.Field) {
        return self.operators.val();
      }

      return null;
    },
    getEndpoint: function getEndpoint() {
      var self = this;

      if (self.parent instanceof _.Conditions.Group && self.parent.content instanceof _.Conditions.Row && self.parent.content.parent instanceof _.Conditions) {
        return window.ajaxurl + '?' + self.parent.content.parent.opt.query;
      }

      return "";
    }
  });
})(FooFields.$, FooFields, FooFields.utils, FooFields.utils.is, FooFields.utils.obj);
"use strict";

(function ($, _, _is, _str) {
  _.Conditions.Group.RowIndex = _.Field.extend({
    setup: function setup() {
      this.content.on("index-change", this.onIndexChange, this);
    },
    teardown: function teardown() {
      this.content.off("index-change");
    },
    onIndexChange: function onIndexChange(e, index) {
      this.$input.text(_str.format(this.opt.format, {
        index: index,
        count: index + 1
      }));
    }
  });

  _.fields.register("conditions-group-index", _.Conditions.Group.RowIndex, ".foofields-type-conditions-group-index", {
    format: "{count}"
  }, {}, {});
})(FooFields.$, FooFields, FooFields.utils.is, FooFields.utils.str);
"use strict";

(function ($, _, _is, _obj) {
  if (!window.Selectize) {
    console.log("FooFields.Conditions.Group.Selectize dependency missing.");
    return;
  }

  _.Conditions.Group.Selectize = _.Field.extend({
    setup: function setup() {
      var self = this;
      self.$select = self.$input.children("select").first(); // merge options off the select element itself to be able to get the saved values etc.

      _obj.extend(self.opt, self.$select.data()); // once we have merged all base options cleanup the select element so Selectize itself
      // does not try picking up the values again


      self.$select.removeData('selectize');
      self.$select.removeAttr('data-selectize');
      self.setupSelectize(true);
      self.content.types.on('change', self.onTypeChanged, self);
    },
    setupSelectize: function setupSelectize(isFirstSetup) {
      var self = this,
          settings = {},
          typeOptions = self.content.getTypeOptions();

      _obj.extend(settings, self.opt.selectize, typeOptions, {
        onChange: self.onSelectizeChange.bind(self)
      });

      var hasSavedValues = false; // here we remove the saved value from the default options if it is a first time setup

      if (isFirstSetup && _is.array(self.opt.selectize.items) && self.opt.selectize.items.length) {
        delete self.opt.selectize.items;

        if (_is.array(settings.items) && settings.items.length > 0) {
          hasSavedValues = true;
          self.content.changed = true;
        }
      }

      if (_is.array(settings.options) && settings.options.length > 0) {
        // handle the firstSelected option only if there are no saved values
        if (!hasSavedValues && settings.firstSelected && _is.string(settings.valueField)) {
          var first = settings.options[0];

          if (first.hasOwnProperty(settings.valueField)) {
            settings.items = [first[settings.valueField]];
          }
        }
      } else {
        _obj.extend(settings, {
          preload: hasSavedValues || settings.firstSelected,
          load: self.onSelectizeLoad.bind(self)
        });
      }

      if (settings.maxItems !== 1) {
        settings.plugins = ['remove_button'];
      }

      if (self.api instanceof window.Selectize) {
        self.api.destroy();
      }

      self.api = self.$select.selectize(settings).get(0).selectize;

      if (settings.preload && self.api instanceof window.Selectize) {
        self.api.on('load', function (data) {
          if (_is.array(data) && data.length > 0) {
            // handle the firstSelected option only if there are no saved values
            if (!hasSavedValues && settings.firstSelected && _is.string(settings.valueField)) {
              var _first = data[0];

              if (_first.hasOwnProperty(settings.valueField)) {
                self.api.setValue(_first[settings.valueField]);
              }
            } else if (hasSavedValues) {
              // could possible check if the items exist within the data before setting the value
              self.api.setValue(settings.items);
            }
          } else {
            console.debug(self.i18n.dataInvalid, data);
          }
        });
      }
    },
    teardown: function teardown() {
      var self = this;

      if (self.api instanceof Selectize) {
        self.api.destroy();
      }
    },
    fetch: function fetch(query) {
      var self = this,
          type = self.content.getType(),
          operator = self.content.getOperator(),
          endpoint = self.content.getEndpoint();
      return $.get(endpoint, {
        q: query,
        type: type,
        operator: operator
      });
    },
    enable: function enable() {
      var self = this;

      if (self.api instanceof Selectize) {
        self.api.enable();
      }
    },
    disable: function disable() {
      var self = this;

      if (self.api instanceof Selectize) {
        self.api.disable();
      }
    },
    val: function val(value) {
      var self = this;

      if (!!self.api) {
        if (!_is.undef(value)) {
          self.api.setValue(value);
          self.doValueChanged();
          return;
        }

        return self.api.getValue();
      }

      return "";
    },
    onTypeChanged: function onTypeChanged() {
      this.setupSelectize();
    },
    onSelectizeLoad: function onSelectizeLoad(query, callback) {
      // the callback method for the selectize 'load' option
      var self = this;
      self.fetch(query).done(function (response) {
        callback(response.results);
      }).fail(function () {
        callback();
      });
    },
    onSelectizeChange: function onSelectizeChange(value) {
      var self = this; // if (self.api instanceof window.Selectize) {
      // 	const selection = self.api.getItem(value);
      // }
    }
  });

  _.fields.register("conditions-group-selectize", _.Conditions.Group.Selectize, ".foofields-type-conditions-group-selectize", {
    selectize: {
      preload: false,
      delimiter: ', ',
      create: false,
      valueField: 'id',
      labelField: 'text',
      searchField: 'text',
      maxItems: null,
      firstSelected: false,
      closeAfterSelect: true
    }
  }, {}, {
    dataInvalid: 'The selectize load method returned an empty or unexpected data object.'
  });
})(FooFields.$, FooFields, FooFields.utils.is, FooFields.utils.obj);
"use strict";

(function ($, _, _is, _obj) {
  _.Conditions.Group.DeleteButton = _.Field.extend({
    setup: function setup() {
      var self = this;
      self.$button = self.$input.find(self.sel.button).on("click.foofields", {
        self: self
      }, self.onClick);
      self.confirmMessage = self.$button.data('confirm');
    },
    teardown: function teardown() {
      this.$button.off(".foofields");
    },
    removeRow: function removeRow() {
      var self = this;

      if (self.content.changed === false || _is.string(self.confirmMessage) && confirm(self.confirmMessage)) {
        // within the context of a conditions repeater the fields content property
        // holds a reference to its parent ConditionsGroupRow so we can simply
        // call the .remove() method.
        self.content.remove();
      }
    },
    onClick: function onClick(e) {
      e.preventDefault();
      e.stopPropagation();
      e.data.self.removeRow();
    }
  });

  _.fields.register("conditions-group-delete", _.Conditions.Group.DeleteButton, ".foofields-type-conditions-group-delete", {}, {
    button: "foofields-conditions-group-delete"
  }, {});
})(FooFields.$, FooFields, FooFields.utils.is, FooFields.utils.obj);
"use strict";

(function ($, _, _is, _obj) {
  _.Conditions.Group.AddButton = _.Field.extend({
    setup: function setup() {
      var self = this;
      self.$button = self.$input.find(self.sel.button).on("click.foofields", {
        self: self
      }, self.onClick);
    },
    teardown: function teardown() {
      this.$button.off(".foofields");
    },
    addNewRow: function addNewRow() {
      this.content.addNewRow();
    },
    onClick: function onClick(e) {
      e.preventDefault();
      e.stopPropagation();
      e.data.self.addNewRow();
    }
  });

  _.fields.register("conditions-group-add", _.Conditions.Group.AddButton, ".foofields-type-conditions-group-add", {}, {
    button: "foofields-conditions-group-add"
  }, {});
})(FooFields.$, FooFields, FooFields.utils.is, FooFields.utils.obj);
"use strict";

(function ($, _, _utils, _is, _obj, _str) {
  _.Live = _utils.EventClass.extend({
    construct: function construct() {
      var self = this;

      self._super();

      self.containerId = 'foobar_notification-settings-container';
      self.idRegex = /^foobar_notification-settings_(.*?)-field$/;
      self.nameRegex = /^foobar_notification-settings\[(.*?)]$/;
      self.nameFormat = 'foobar_notification-settings[{0}]';
      self.bar = null;
      self.opt = null;
      self.ctnr = null;
      self.$inputs = null;
      self.fields = [];
      self.initialized = false;
    },
    register: function register(field) {
      var self = this;

      if (field instanceof _.Live.Field) {
        field.live = self;
        self.fields.push(field);
        return true;
      }

      return false;
    },
    init: function init() {
      var self = this;
      self.bar = self.getBar();

      if (self.bar instanceof _.Bar) {
        self.opt = _obj.extend({}, self.bar.opt);
        self.bar.$el.removeData('options').removeAttr('data-options');
        self.ctnr = FooFields.container(self.containerId);

        if (self.ctnr instanceof FooFields.Container) {
          // hijack the container activate method, so we can perform actions when tabs are changed
          var _activate = self.ctnr.activate;

          self.ctnr.activate = function (id) {
            _activate.call(self.ctnr, id);

            self.trigger('tab-changed', [self.ctnr.$state.val()]);
          };

          self.$inputs = self.ctnr.$el.find(':input');
          var data = self.getData();
          self.fields.forEach(function (field) {
            field.init(data);
          }); // once all fields are initialized then we can remove the custom css style
          // tag output by the server and use the live customizer output

          $('style#' + self.bar.id + '_custom').remove();
          self.trigger('tab-changed', [self.ctnr.$state.val()]);
          self.initialized = true;
        }
      }
    },
    getPostId: function getPostId() {
      // in the edit post page WordPress outputs a hidden input into the form with an id of 'post_ID'
      var $input = $('#post_ID');

      if ($input.length > 0) {
        return $input.val();
      }

      throw new Error('Unable to find the "#post_ID" element.');
    },
    getBar: function getBar() {
      var self = this,
          postId = self.getPostId(),
          bars = _.getAll();

      return _utils.find(bars, function (bar) {
        return _str.endsWith(bar.id, postId);
      });
    },
    getItemByCapability: function getItemByCapability(capabilities) {
      var _self$bar$findChild;

      var self = this;

      if (!_is.array(capabilities) || capabilities.length === 0) {
        return self.bar.item instanceof _.Item ? self.bar.item : self.bar.getFirst();
      }

      return (_self$bar$findChild = self.bar.findChild(function (item) {
        return _is.array(item.capabilities) ? capabilities.some(function (capability) {
          return item.capabilities.includes(capability);
        }) : false;
      })) !== null && _self$bar$findChild !== void 0 ? _self$bar$findChild : self.bar.getFirst();
    },
    getData: function getData() {
      return this.$inputs.serializeArray();
    },
    getValue: function getValue(name, data) {
      var self = this;

      if (_is.string(name)) {
        if (!self.nameRegex.test(name)) {
          name = _str.format(self.nameFormat, name);
        }

        if (!_is.array(data)) data = self.getData();

        var found = _utils.find(data, function (obj) {
          return obj.name === name;
        });

        if (_is.hash(found) && _is.string(found.value)) {
          return found.value;
        }
      }

      return null;
    },
    setClass: function setClass(className, removeClassNames) {
      var self = this;
      self.bar.disableTransitionsTemporarily(function ($el) {
        $el.removeClass(_is.array(removeClassNames) ? removeClassNames.join(' ') : removeClassNames + '').addClass(className);
      });
    },
    setItemClass: function setItemClass(className, removeClassNames) {
      var self = this;

      if (self.bar.item instanceof _.Item) {
        self.bar.disableTransitionsTemporarily(function () {
          self.bar.item.$el.removeClass(_is.array(removeClassNames) ? removeClassNames.join(' ') : removeClassNames + '').addClass(className);
        });
      }
    },
    addItemClass: function addItemClass(className) {
      var self = this;

      if (self.bar.item instanceof _.Item) {
        self.bar.disableTransitionsTemporarily(function () {
          self.bar.item.$el.addClass(_is.array(className) ? className.join(' ') : className + '');
        });
      }
    },
    removeItemClass: function removeItemClass(className) {
      var self = this;

      if (self.bar.item instanceof _.Item) {
        self.bar.disableTransitionsTemporarily(function () {
          self.bar.item.$el.removeClass(_is.array(className) ? className.join(' ') : className + '');
        });
      }
    },
    toggleItemClass: function toggleItemClass(className, state) {
      var self = this;

      if (state) {
        self.addItemClass(className);
      } else {
        self.removeItemClass(className);
      }
    },
    setIcon: function setIcon(name, iconName) {
      var bar = this.bar;

      if (bar.opt.icons.hasOwnProperty(name) && bar.cls.icons.hasOwnProperty(name) && _.icons.exists(iconName, bar.opt.svg)) {
        bar.opt.icons[name] = iconName;
        bar.$el.find(bar.sel.icons[name]).each(function (i, el) {
          $(el).replaceWith(_.icons.get(iconName, bar.opt.svg, [bar.cls.icons[name]]));
        });
      }
    },
    setOption: function setOption(name, value) {
      var self = this;

      _obj.prop(self.opt, name, value);
    },
    nl2br: function nl2br(value) {
      return value.replace(/(?:\r\n|\r|\n)/g, '<br/>');
    },
    setMessage: function setMessage(ids, data) {
      var self = this;

      if (self.bar.item instanceof _.Item) {
        ids = _obj.extend({
          text: null,
          show_link: null,
          link_text: null,
          link_url: null,
          link_target: null
        }, ids);
        self.setMessageDirect({
          text: self.getValue(ids.text, data),
          show_link: self.getValue(ids.show_link, data),
          link_text: self.getValue(ids.link_text, data),
          link_url: self.getValue(ids.link_url, data),
          link_target: self.getValue(ids.link_target, data)
        });
      }
    },
    setMessageDirect: function setMessageDirect(data) {
      var self = this;

      if (self.bar.item instanceof _.Item) {
        data = _obj.extend({
          text: null,
          show_link: null,
          link_text: null,
          link_url: null,
          link_target: null
        }, data);
        var $message = self.bar.item.$el.find('.fbr-message');

        if (_is.string(data.text)) {
          $message.html(self.nl2br(data.text));
        }

        if (data.show_link === 'yes' && _is.string(data.link_text) && data.link_text.length > 0) {
          $message.append($('<a/>', {
            text: data.link_text,
            href: data.link_url,
            target: data.link_target
          }));
        }
      }
    },
    setButton: function setButton(className, values, isSecondary) {
      var self = this;
      var $button = self.bar.item.$el.find('.' + className);
      values = _obj.extend({
        show_button: 'yes',
        icon: null,
        show_icon: 'no',
        text: null,
        href: null,
        target: null,
        mobile: 'fbr-mobile-100'
      }, values);

      if (values.show_button === 'yes') {
        if ($button.length === 0) {
          $button = $('<a/>', {
            'class': 'fbr-button' + (_is.string(values.mobile) ? ' ' + values.mobile : '') + ' ' + className + (isSecondary ? ' fbr-button-secondary' : '') + (values.show_icon !== 'yes' ? ' fbr-no-icon' : ''),
            text: values.text,
            href: values.href,
            target: values.target
          }).prepend(self.bar.icon(values.icon));
          var $buttons = self.bar.item.$el.find('.fbr-buttons');

          if ($buttons.length === 0) {
            $buttons = $('<div/>', {
              'class': 'fbr-buttons'
            });
            self.bar.item.$el.find('.fbr-message').after($buttons);
          }

          if (isSecondary) $buttons.append($button);else $buttons.prepend($button);
        } else {
          $button.text(values.text).attr({
            href: values.url,
            target: values.target
          }).toggleClass('fbr-button-secondary', isSecondary).toggleClass('fbr-no-icon', values.show_icon !== 'yes').removeClass('fbr-mobile-33 fbr-mobile-50 fbr-mobile-100').addClass(values.mobile).prepend(self.bar.icon(values.icon));
        }
      } else {
        $button.remove();
      }
    },
    reinit: function reinit() {
      var self = this,
          $bar = self.bar.$el;
      self.bar.destroy();
      self.bar = _.plugin.createChild($bar.data('options', _obj.extend({}, self.opt)));
      self.bar.init();
    },
    redraw: function redraw() {
      var self = this;
      self.bar.opt = _obj.extend({}, self.opt);

      _.layout(true);
    }
  });
  _.live = new _.Live();
})(FooBar.$, FooBar, FooBar.utils, FooBar.utils.is, FooBar.utils.obj, FooBar.utils.str);
"use strict";

(function ($, _, _utils, _is, _fn) {
  _.Live.Field = _utils.Class.extend({
    construct: function construct(id, capabilities, targetType) {
      var self = this;
      self.id = id;
      self.capabilities = _is.array(capabilities) ? capabilities : [];
      self.targetType = _is.fn(targetType) ? targetType : null;
      self.live = null;
      self.field = null;
      self.initial = {};
    },
    hasChanged: function hasChanged(name, value) {
      var self = this,
          same = self.initial.hasOwnProperty(name) && self.initial[name] === value;
      self.initial[name] = value;
      return !same;
    },
    init: function init(data) {
      var self = this;

      if (self.live instanceof _.Live) {
        self.field = self.live.ctnr.field(self.id);

        if (self.field instanceof FooFields.Field) {
          self.setup(data);
          self.field.on('change', self.onChange, self);
        }
      }
    },
    setup: function setup(data) {},
    getValue: function getValue(name, data) {
      return this.live.getValue(name, data);
    },
    targetItem: function targetItem() {
      var self = this;

      if (self.targetType !== null) {
        var target = self.live.bar.getByType(self.targetType);

        if (target instanceof _.Item) {
          return target;
        }
      }

      return self.live.getItemByCapability(self.capabilities);
    },
    showTarget: function showTarget() {
      var self = this,
          target = self.targetItem();

      if (self.live.bar.item !== target) {
        return self.live.bar.goto(target);
      } else {
        return _fn.resolve();
      }
    },
    applyChange: function applyChange(data) {},
    finalize: function finalize(redraw, reinit) {
      var self = this;
      if (reinit) self.live.reinit();else if (redraw) self.live.redraw();
    },
    onChange: function onChange() {
      var self = this;
      self.showTarget().then(function () {
        self.applyChange(self.live.getData());
      });
    }
  });
})(FooBar.$, FooBar, FooBar.utils, FooBar.utils.is, FooBar.utils.fn);
"use strict";

(function ($, _, _utils, _is, _obj, _str) {
  _.Live.CustomizerField = _.Live.Field.extend({
    construct: function construct(id, capabilities, targetType) {
      var self = this;

      self._super(id, capabilities, targetType);

      self.style = null;
    },
    hasChanges: function hasChanges(values) {
      var self = this;
      var changed = false;

      _utils.each(values, function (value, name) {
        if (self.hasChanged(name, value) && !changed) {
          changed = true;
        }
      });

      return changed;
    },
    setup: function setup(data, initial) {
      var self = this;
      self.style = document.createElement("style");
      self.style.appendChild(document.createTextNode(""));
      document.head.appendChild(self.style);

      if (_is.hash(initial)) {
        self.initial = initial;
      }

      self.applyChange(data, true);
    },
    getColor: function getColor(name, data) {
      var self = this,
          value = self.getValue(name, data);
      return value !== null ? value : 'rgba(0,0,0,0)';
    },
    applyChange: function applyChange(data, init) {
      var self = this;
      self.style.innerHTML = self.toCSS(self.live.bar.id, data, init);
    },

    /**
     * @param {string} barId
     * @param {Object} data
     * @abstract
     * @returns {string}
     */
    toCSS: function toCSS(barId, data) {
      throw new Error('A customizer group must have its "toCSS" method overridden in a sub class.');
    }
  });
})(FooBar.$, FooBar, FooBar.utils, FooBar.utils.is, FooBar.utils.obj, FooBar.utils.str);
"use strict";

(function ($, _, _utils, _is, _obj, _str) {
  _.Live.CombinedField = _.Live.Field.extend({
    construct: function construct(ids, capabilities, targetType) {
      var self = this;
      self.ids = ids;
      self.capabilities = _is.array(capabilities) ? capabilities : [];
      self.targetType = _is.fn(targetType) ? targetType : null;
      self.live = null;
      self.fields = [];
      self.initial = {};
    },
    init: function init(data) {
      var self = this;

      if (self.live instanceof _.Live && _is.array(self.ids)) {
        self.fields = self.ids.map(function (id) {
          return self.live.ctnr.field(id);
        }).filter(function (field) {
          return field instanceof FooFields.Field;
        });

        if (self.fields.length > 1) {
          self.setup(data);
          self.fields.forEach(function (field) {
            field.on('change', self.onChange, self);
          });
        }
      }
    }
  });
})(FooBar.$, FooBar, FooBar.utils, FooBar.utils.is, FooBar.utils.obj, FooBar.utils.str);
"use strict";

(function ($, _, _utils, _is, _obj, _str) {
  _.Live.CombinedCustomizerField = _.Live.CombinedField.extend({
    construct: function construct(ids, capabilities, targetType) {
      var self = this;

      self._super(ids, capabilities, targetType);

      self.style = null;
    },
    hasChanges: function hasChanges(values) {
      var self = this;
      var changed = false;

      _utils.each(values, function (value, name) {
        if (self.hasChanged(name, value) && !changed) {
          changed = true;
        }
      });

      return changed;
    },
    setup: function setup(data, initial) {
      var self = this;
      self.style = document.createElement("style");
      self.style.appendChild(document.createTextNode(""));
      document.head.appendChild(self.style);

      if (_is.hash(initial)) {
        self.initial = initial;
      }

      self.applyChange(data, true);
    },
    getColor: function getColor(name, data) {
      var self = this,
          value = self.getValue(name, data);
      return value !== null ? value : 'rgba(0,0,0,0)';
    },
    applyChange: function applyChange(data, init) {
      var self = this;
      self.style.innerHTML = self.toCSS(self.live.bar.id, data, init);
    },

    /**
     * @param {string} barId
     * @param {Object} data
     * @abstract
     * @returns {string}
     */
    toCSS: function toCSS(barId, data) {
      throw new Error('A customizer group must have its "toCSS" method overridden in a sub class.');
    }
  });
})(FooBar.$, FooBar, FooBar.utils, FooBar.utils.is, FooBar.utils.obj, FooBar.utils.str);
"use strict";

(function ($, _, _utils, _is, _obj, _str) {
  _.Live.Appearance_Customizer_Background = _.Live.CustomizerField.extend({
    construct: function construct() {
      this._super('foobar_notification-settings_custom_color_background_field_group-field');
    },
    setup: function setup(data) {
      var self = this;

      self._super(data, {
        type: self.getValue('custom_color_background_type', data),
        solid: self.getColor('custom_color_background_solid', data),
        gradient_from: self.getColor('custom_color_background_gradient_from', data),
        gradient_to: self.getColor('custom_color_background_gradient_to', data),
        gradient_type: self.getValue('custom_color_background_gradient_type', data),
        gradient_angle: self.getValue('custom_color_background_gradient_angle', data)
      });
    },
    toCSS: function toCSS(barId, data, init) {
      var self = this,
          values = {
        type: self.getValue('custom_color_background_type', data),
        solid: self.getColor('custom_color_background_solid', data),
        gradient_from: self.getColor('custom_color_background_gradient_from', data),
        gradient_to: self.getColor('custom_color_background_gradient_to', data),
        gradient_type: self.getValue('custom_color_background_gradient_type', data),
        gradient_angle: self.getValue('custom_color_background_gradient_angle', data)
      };
      var css = '';

      switch (values.type) {
        case "solid":
          css += '\n#' + barId + '.fbr-custom-color .fbr-content {';
          css += '\n\tbackground-color: ' + values.solid + ';';
          css += '\n}';
          break;

        case "gradient":
          var angle = 'circle';

          if (values.gradient_type === 'linear') {
            angle = values.gradient_angle + 'deg';
          }

          css += '\n#' + barId + '.fbr-custom-color .fbr-content {';
          css += '\n\tbackground: ' + values.gradient_from + ';';
          css += '\n\tbackground: ' + values.gradient_type + '-gradient(' + angle + ', ' + values.gradient_from + ' 0%, ' + values.gradient_to + ' 100%);';
          css += '\n}';
          break;
      }

      return css;
    }
  });

  _.live.register(new _.Live.Appearance_Customizer_Background());
})(FooBar.$, FooBar, FooBar.utils, FooBar.utils.is, FooBar.utils.obj, FooBar.utils.str);
"use strict";

(function ($, _, _utils, _is, _obj, _str) {
  _.Live.Appearance_Customizer_Border = _.Live.CustomizerField.extend({
    construct: function construct() {
      this._super('foobar_notification-settings_custom_color_border_field_group-field', ['has_border']);
    },
    setup: function setup(data) {
      var self = this;

      self._super(data, {
        color: self.getValue('custom_color_border_color', data)
      });
    },
    toCSS: function toCSS(barId, data, init) {
      var self = this,
          values = {
        color: self.getValue('custom_color_border_color', data)
      };
      var css = '';
      css += '\n#' + barId + '.fbr-custom-color .fbr-side-border {';
      css += '\n\tborder-color: ' + values.color + ';';
      css += '\n}';
      return css;
    }
  });

  _.live.register(new _.Live.Appearance_Customizer_Border());
})(FooBar.$, FooBar, FooBar.utils, FooBar.utils.is, FooBar.utils.obj, FooBar.utils.str);
"use strict";

(function ($, _, _utils, _is, _obj, _str) {
  _.Live.Appearance_Customizer_Button = _.Live.CustomizerField.extend({
    construct: function construct() {
      this._super('foobar_notification-settings_custom_color_button_field_group-field', ['has_buttons', 'has_button']);
    },
    setup: function setup(data) {
      var self = this;

      self._super(data, {
        background: self.getColor('custom_color_button_background', data),
        text: self.getColor('custom_color_button_text', data),
        hover_background: self.getColor('custom_color_button_hover_background', data),
        hover_text: self.getColor('custom_color_button_hover_text', data)
      });
    },
    toCSS: function toCSS(barId, data, init) {
      var self = this,
          values = {
        background: self.getColor('custom_color_button_background', data),
        text: self.getColor('custom_color_button_text', data),
        hover_background: self.getColor('custom_color_button_hover_background', data),
        hover_text: self.getColor('custom_color_button_hover_text', data)
      };
      var css = '';
      css += '\n#' + barId + '.fbr-custom-color .fbr-button {';
      css += '\n\tbackground-color: ' + values.background + ';';
      css += '\n\tcolor: ' + values.text + ';';
      css += '\n}';
      css += '\n#' + barId + '.fbr-custom-color .fbr-button:hover {';
      css += '\n\tbackground-color: ' + values.hover_background + ';';
      css += '\n\tcolor: ' + values.hover_text + ';';
      css += '\n}';
      return css;
    }
  });

  _.live.register(new _.Live.Appearance_Customizer_Button());
})(FooBar.$, FooBar, FooBar.utils, FooBar.utils.is, FooBar.utils.obj, FooBar.utils.str);
"use strict";

(function ($, _, _utils, _is, _obj, _str) {
  _.Live.Appearance_Customizer_ButtonSecondary = _.Live.CustomizerField.extend({
    construct: function construct() {
      this._super('foobar_notification-settings_custom_color_button_secondary_field_group-field', ['has_buttons', 'has_button_secondary']);
    },
    setup: function setup(data) {
      var self = this;

      self._super(data, {
        background: self.getColor('custom_color_button_secondary_background', data),
        text: self.getColor('custom_color_button_secondary_text', data),
        hover_background: self.getColor('custom_color_button_secondary_hover_background', data),
        hover_text: self.getColor('custom_color_button_secondary_hover_text', data)
      });
    },
    toCSS: function toCSS(barId, data, init) {
      var self = this,
          values = {
        background: self.getColor('custom_color_button_secondary_background', data),
        text: self.getColor('custom_color_button_secondary_text', data),
        hover_background: self.getColor('custom_color_button_secondary_hover_background', data),
        hover_text: self.getColor('custom_color_button_secondary_hover_text', data)
      };
      var css = '';
      css += '\n#' + barId + '.fbr-custom-color .fbr-button.fbr-button-secondary {';
      css += '\n\tbackground-color: ' + values.background + ';';
      css += '\n\tcolor: ' + values.text + ';';
      css += '\n}';
      css += '\n#' + barId + '.fbr-custom-color .fbr-button.fbr-button-secondary:hover {';
      css += '\n\tbackground-color: ' + values.hover_background + ';';
      css += '\n\tcolor: ' + values.hover_text + ';';
      css += '\n}';
      return css;
    }
  });

  _.live.register(new _.Live.Appearance_Customizer_ButtonSecondary());
})(FooBar.$, FooBar, FooBar.utils, FooBar.utils.is, FooBar.utils.obj, FooBar.utils.str);
"use strict";

(function ($, _, _utils, _is, _obj, _str) {
  _.Live.Appearance_Customizer_NextButton = _.Live.CustomizerField.extend({
    construct: function construct() {
      this._super('foobar_notification-settings_custom_color_next_field_group-field');
    },
    setup: function setup(data) {
      var self = this;

      self._super(data, {
        background: self.getColor('custom_color_next_background', data),
        icon: self.getColor('custom_color_next_icon', data),
        hover_background: self.getColor('custom_color_next_hover_background', data),
        hover_icon: self.getColor('custom_color_next_hover_icon', data)
      });
    },
    toCSS: function toCSS(barId, data, init) {
      var self = this,
          values = {
        background: self.getColor('custom_color_next_background', data),
        icon: self.getColor('custom_color_next_icon', data),
        hover_background: self.getColor('custom_color_next_hover_background', data),
        hover_icon: self.getColor('custom_color_next_hover_icon', data)
      };
      var css = '';
      css += '\n#' + barId + '.fbr-custom-color .fbr-next {';
      css += '\n\tbackground-color: ' + values.background + ';';
      css += '\n\tcolor: ' + values.icon + ';';
      css += '\n}';
      css += '\n#' + barId + '.fbr-custom-color .fbr-next:hover {';
      css += '\n\tbackground-color: ' + values.hover_background + ';';
      css += '\n\tcolor: ' + values.hover_icon + ';';
      css += '\n}';
      return css;
    }
  });

  _.live.register(new _.Live.Appearance_Customizer_NextButton());
})(FooBar.$, FooBar, FooBar.utils, FooBar.utils.is, FooBar.utils.obj, FooBar.utils.str);
"use strict";

(function ($, _, _utils, _is, _obj, _str) {
  _.Live.Appearance_Customizer_PreviousButton = _.Live.CustomizerField.extend({
    construct: function construct() {
      this._super('foobar_notification-settings_custom_color_prev_field_group-field');
    },
    setup: function setup(data) {
      var self = this;

      self._super(data, {
        background: self.getColor('custom_color_prev_background', data),
        icon: self.getColor('custom_color_prev_icon', data),
        hover_background: self.getColor('custom_color_prev_hover_background', data),
        hover_icon: self.getColor('custom_color_prev_hover_icon', data)
      });
    },
    toCSS: function toCSS(barId, data, init) {
      var self = this,
          values = {
        background: self.getColor('custom_color_next_background', data),
        icon: self.getColor('custom_color_next_icon', data),
        hover_background: self.getColor('custom_color_next_hover_background', data),
        hover_icon: self.getColor('custom_color_next_hover_icon', data)
      };
      var css = '';
      css += '\n#' + barId + '.fbr-custom-color .fbr-prev {';
      css += '\n\tbackground-color: ' + values.background + ';';
      css += '\n\tcolor: ' + values.icon + ';';
      css += '\n}';
      css += '\n#' + barId + '.fbr-custom-color .fbr-prev:hover {';
      css += '\n\tbackground-color: ' + values.hover_background + ';';
      css += '\n\tcolor: ' + values.hover_icon + ';';
      css += '\n}';
      return css;
    }
  });

  _.live.register(new _.Live.Appearance_Customizer_PreviousButton());
})(FooBar.$, FooBar, FooBar.utils, FooBar.utils.is, FooBar.utils.obj, FooBar.utils.str);
"use strict";

(function ($, _, _utils, _is, _obj, _str) {
  _.Live.Appearance_Customizer_TextAndLinks = _.Live.CustomizerField.extend({
    construct: function construct() {
      this._super('foobar_notification-settings_custom_color_text_field_group-field');
    },
    setup: function setup(data) {
      var self = this;

      self._super(data, {
        text: self.getColor('custom_color_text', data),
        link: self.getColor('custom_color_link', data),
        link_hover: self.getColor('custom_color_link_hover', data)
      });
    },
    toCSS: function toCSS(barId, data, init) {
      var self = this,
          values = {
        text: self.getColor('custom_color_text', data),
        link: self.getColor('custom_color_link', data),
        link_hover: self.getColor('custom_color_link_hover', data)
      };
      var css = '';
      css += '\n#' + barId + '.fbr-custom-color .fbr-content {';
      css += '\n\tcolor: ' + values.text + ';';
      css += '\n}';
      css += '\n#' + barId + '.fbr-custom-color .fbr-message a {';
      css += '\n\tcolor: ' + values.link + ';';
      css += '\n}';
      css += '\n#' + barId + '.fbr-custom-color .fbr-message a:hover {';
      css += '\n\tcolor: ' + values.link_hover + ';';
      css += '\n}';
      return css;
    }
  });

  _.live.register(new _.Live.Appearance_Customizer_TextAndLinks());
})(FooBar.$, FooBar, FooBar.utils, FooBar.utils.is, FooBar.utils.obj, FooBar.utils.str);
"use strict";

(function ($, _, _utils, _is, _obj, _str) {
  _.Live.Appearance_Customizer_TextInput = _.Live.CustomizerField.extend({
    construct: function construct() {
      this._super('foobar_notification-settings_custom_color_text_input_field_group-field', ['has_inputs', 'has_text_input']);
    },
    setup: function setup(data) {
      var self = this;

      self._super(data, {
        background: self.getColor('custom_color_text_input_background', data),
        text: self.getColor('custom_color_text_input_text', data),
        placeholder: self.getColor('custom_color_text_input_placeholder', data)
      });
    },
    toCSS: function toCSS(barId, data, init) {
      var self = this,
          values = {
        background: self.getColor('custom_color_text_input_background', data),
        text: self.getColor('custom_color_text_input_text', data),
        placeholder: self.getColor('custom_color_text_input_placeholder', data)
      };
      var css = '';
      css += '\n#' + barId + '.fbr-custom-color .fbr-item .fbr-input {';
      css += '\n\tbackground-color: ' + values.background + ';';
      css += '\n\tcolor: ' + values.text + ';';
      css += '\n}';
      css += '\n#' + barId + '.fbr-custom-color .fbr-item .fbr-input::placeholder {';
      css += '\n\tcolor: ' + values.placeholder + ';';
      css += '\n}';
      return css;
    }
  });

  _.live.register(new _.Live.Appearance_Customizer_TextInput());
})(FooBar.$, FooBar, FooBar.utils, FooBar.utils.is, FooBar.utils.obj, FooBar.utils.str);
"use strict";

(function ($, _, _utils, _is, _obj, _str) {
  _.Live.Appearance_Customizer_TextInputWithButton = _.Live.CombinedCustomizerField.extend({
    construct: function construct() {
      this._super(['foobar_notification-settings_custom_color_text_input_background-field', 'foobar_notification-settings_custom_color_button_background-field'], ['has_input_with_button']);
    },
    setup: function setup(data) {
      var self = this;

      self._super(data, {
        text: self.getColor('custom_color_text_input_background', data),
        button: self.getColor('custom_color_button_background', data)
      });
    },
    toCSS: function toCSS(barId, data, init) {
      var self = this,
          values = {
        text: self.getColor('custom_color_text_input_background', data),
        button: self.getColor('custom_color_button_background', data)
      };
      var css = '';
      css += '\n#' + barId + '.fbr-custom-color .fbr-item .fbr-input-with-button:before,';
      css += '\n#' + barId + '.fbr-custom-color .fbr-item .fbr-input-with-button:after {';
      css += '\n\tbackground: -webkit-gradient(linear, left top, right top, from(' + values.text + '), color-stop(12em, ' + values.text + '), color-stop(12em, ' + values.button + '), to(' + values.button + '));';
      css += '\n\tbackground: linear-gradient(to right, ' + values.text + ', ' + values.text + ' 12em, ' + values.button + ' 12em, ' + values.button + ');';
      css += '\n}';
      return css;
    }
  });

  _.live.register(new _.Live.Appearance_Customizer_TextInputWithButton());
})(FooBar.$, FooBar, FooBar.utils, FooBar.utils.is, FooBar.utils.obj, FooBar.utils.str);
"use strict";

(function ($, _, _utils, _is, _obj, _str) {
  _.Live.Appearance_Customizer_ToggleButton = _.Live.CustomizerField.extend({
    construct: function construct() {
      this._super('foobar_notification-settings_custom_color_toggle_field_group-field');
    },
    setup: function setup(data) {
      var self = this;

      self._super(data, {
        background: self.getColor('custom_color_toggle_background', data),
        icon: self.getColor('custom_color_toggle_icon', data),
        hover_background: self.getColor('custom_color_toggle_hover_background', data),
        hover_icon: self.getColor('custom_color_toggle_hover_icon', data)
      });
    },
    toCSS: function toCSS(barId, data, init) {
      var self = this,
          values = {
        background: self.getColor('custom_color_toggle_background', data),
        icon: self.getColor('custom_color_toggle_icon', data),
        hover_background: self.getColor('custom_color_toggle_hover_background', data),
        hover_icon: self.getColor('custom_color_toggle_hover_icon', data)
      };
      var css = '';
      css += '\n#' + barId + '.fbr-custom-color .fbr-toggle {';
      css += '\n\tbackground-color: ' + values.background + ';';
      css += '\n\tcolor: ' + values.icon + ';';
      css += '\n}';
      css += '\n#' + barId + '.fbr-custom-color .fbr-toggle:hover {';
      css += '\n\tbackground-color: ' + values.hover_background + ';';
      css += '\n\tcolor: ' + values.hover_icon + ';';
      css += '\n}';
      return css;
    }
  });

  _.live.register(new _.Live.Appearance_Customizer_ToggleButton());
})(FooBar.$, FooBar, FooBar.utils, FooBar.utils.is, FooBar.utils.obj, FooBar.utils.str);
"use strict";

(function ($, _, _utils, _is, _obj, _str) {
  _.Live.Appearance_Effects = _.Live.Field.extend({
    construct: function construct() {
      var self = this;

      self._super('foobar_notification-settings_effects_field_group-field');

      self.effects = ['fbr-att-bounce', 'fbr-att-heartbeat', 'fbr-att-pulse', 'fbr-att-ripple', 'fbr-att-wiggle'];
    },
    setup: function setup(data) {
      var self = this;
      self.initial = {
        toggle: self.getValue('effect_toggle', data),
        button: self.getValue('effect_button', data),
        enabled: self.getValue('effect_enabled')
      };
    },
    applyChange: function applyChange(data) {
      var self = this,
          toggle = self.getValue('effect_toggle', data),
          button = self.getValue('effect_button', data),
          enabled = self.getValue('effect_enabled', data);
      var redraw = false,
          reinit = false;

      if (self.hasChanged('toggle', toggle)) {
        self.setEffectClass('toggle', toggle, self.effects);
        redraw = true;
      }

      if (self.hasChanged('button', button)) {
        if (self.live.bar.name === 'sign-up') {
          self.setEffectClass('input-with-button', button, self.effects);
        } else {
          self.setEffectClass('button', button, self.effects);
        }

        redraw = true;
      }

      if (self.hasChanged('enabled', enabled)) {
        self.live.setOption('disableEffects', enabled === 'interaction');
        reinit = true;
      }

      self.finalize(redraw, reinit);
    },
    getItemElement: function getItemElement(selector) {
      var self = this;

      if (self.live.bar.item instanceof _.Item) {
        var $tmp = self.live.bar.item.$el.find(selector).first();

        if ($tmp.length > 0) {
          return $tmp;
        }
      }

      return null;
    },
    setEffectClass: function setEffectClass(type, className, removeClassNames) {
      var self = this;
      var $target =
      /** @type {jQuery|null} */
      null;

      switch (type) {
        case 'toggle':
          $target = self.live.bar.$toggle;
          break;

        case 'button':
          $target = self.getItemElement('.fbr-button');
          break;

        case 'button-secondary':
          $target = self.getItemElement('.fbr-button-secondary');
          break;

        case 'input':
          $target = self.getItemElement('.fbr-input');
          break;

        case 'input-with-button':
          $target = self.getItemElement('.fbr-input-with-button');
          break;
      }

      if (_is.jq($target)) {
        self.live.bar.disableTransitionsTemporarily(function () {
          $target.removeClass(_is.array(removeClassNames) ? removeClassNames.join(' ') : removeClassNames + '').addClass(className);
        });
      }
    }
  });

  _.live.register(new _.Live.Appearance_Effects());
})(FooBar.$, FooBar, FooBar.utils, FooBar.utils.is, FooBar.utils.obj, FooBar.utils.str);
"use strict";

(function ($, _, _utils, _is, _obj, _str) {
  _.Live.Appearance_General = _.Live.Field.extend({
    construct: function construct() {
      var self = this;

      self._super('foobar_notification-settings_appearance_group-field');

      self.colors = ['fbr-blue', 'fbr-green', 'fbr-purple', 'fbr-red', 'fbr-orange', 'fbr-yellow', 'fbr-dark', 'fbr-light', 'fbr-custom-color'];
      self.font_sizes = ['fbr-font-14px', 'fbr-font-16px', 'fbr-font-18px', 'fbr-font-20px', 'fbr-font-22px', 'fbr-font-24px'];
      self.transitions = ['fbr-transition-slide', 'fbr-transition-fade', 'fbr-transition-slide-fade'];
    },
    setup: function setup(data) {
      var self = this;
      self.initial = {
        color: self.getValue('color', data),
        font_size: self.getValue('font_size', data),
        transition: self.getValue('transition', data)
      };
    },
    applyChange: function applyChange(data) {
      var self = this,
          color = self.getValue('color', data),
          font_size = self.getValue('font_size', data),
          transition = self.getValue('transition', data);
      var redraw = false,
          reinit = false;

      if (self.hasChanged('color', color)) {
        self.live.setClass(color, self.colors);
        redraw = true;
      }

      if (self.hasChanged('font_size', font_size)) {
        self.live.setClass(font_size, self.font_sizes);
        redraw = true;
      }

      if (self.hasChanged('transition', transition)) {
        self.live.setClass(transition, self.transitions);
        redraw = true;
      }

      self.finalize(redraw, reinit);
    }
  });

  _.live.register(new _.Live.Appearance_General());
})(FooBar.$, FooBar, FooBar.utils, FooBar.utils.is, FooBar.utils.obj, FooBar.utils.str);
"use strict";

(function ($, _, _utils, _is, _obj, _str) {
  _.Live.Appearance_Icons_Nav = _.Live.Field.extend({
    construct: function construct() {
      var self = this;

      self._super('foobar_notification-settings_icons_navigation_field_group-field');
    },
    setup: function setup(data) {
      var self = this;
      self.initial = {
        prev: self.getValue('nav_icon_prev', data),
        next: self.getValue('nav_icon_next', data)
      };
    },
    applyChange: function applyChange(data) {
      var self = this,
          prev = self.getValue('nav_icon_prev', data),
          next = self.getValue('nav_icon_next', data);

      if (self.hasChanged('prev', prev)) {
        self.live.setIcon('prev', prev);
      }

      if (self.hasChanged('next', next)) {
        self.live.setIcon('next', next);
      }
    }
  });

  _.live.register(new _.Live.Appearance_Icons_Nav());
})(FooBar.$, FooBar, FooBar.utils, FooBar.utils.is, FooBar.utils.obj, FooBar.utils.str);
"use strict";

(function ($, _, _utils, _is, _obj, _str) {
  _.Live.Appearance_Icons_Toggle = _.Live.Field.extend({
    construct: function construct() {
      var self = this;

      self._super('foobar_notification-settings_icons_field_group-field');
    },
    setup: function setup(data) {
      var self = this;
      self.initial = {
        expand: self.getValue('toggle_icon_expand', data),
        collapse: self.getValue('toggle_icon_collapse', data),
        dismiss: self.getValue('toggle_icon_dismiss', data)
      };
    },
    applyChange: function applyChange(data) {
      var self = this,
          expand = self.getValue('toggle_icon_expand', data),
          collapse = self.getValue('toggle_icon_collapse', data),
          dismiss = self.getValue('toggle_icon_dismiss', data);

      if (self.hasChanged('expand', expand)) {
        self.live.setIcon('expand', expand);
      }

      if (self.hasChanged('collapse', collapse)) {
        self.live.setIcon('collapse', collapse);
      }

      if (self.hasChanged('dismiss', dismiss)) {
        self.live.setIcon('dismiss', dismiss);
      }
    }
  });

  _.live.register(new _.Live.Appearance_Icons_Toggle());
})(FooBar.$, FooBar, FooBar.utils, FooBar.utils.is, FooBar.utils.obj, FooBar.utils.str);
"use strict";

(function ($, _, _utils, _is, _obj, _str) {
  _.Live.Content_Announcement_Link = _.Live.Field.extend({
    construct: function construct() {
      var self = this;

      self._super('foobar_notification-settings_announcement_link_group-field');
    },
    setup: function setup(data) {
      var self = this;
      self.initial = {
        text: self.getValue('message_link_text', data),
        url: self.getValue('message_link_url', data),
        target: self.getValue('message_link_target', data)
      };
    },
    applyChange: function applyChange(data) {
      var self = this,
          text = self.getValue('message_link_text', data),
          url = self.getValue('message_link_url', data),
          target = self.getValue('message_link_target', data);
      var redraw = false;

      if (self.hasChanged('text', text) || self.hasChanged('url', url) || self.hasChanged('target', target)) {
        self.live.setMessage({
          text: 'message_text',
          show_link: 'message_show_link',
          link_text: 'message_link_text',
          link_url: 'message_link_url',
          link_target: 'message_link_target'
        }, data);
        redraw = true;
      }

      self.finalize(redraw, false);
    }
  });

  _.live.register(new _.Live.Content_Announcement_Link());
})(FooBar.$, FooBar, FooBar.utils, FooBar.utils.is, FooBar.utils.obj, FooBar.utils.str);
"use strict";

(function ($, _, _utils, _is, _obj, _str) {
  _.Live.Content_Announcement_Message = _.Live.Field.extend({
    construct: function construct() {
      var self = this;

      self._super('foobar_notification-settings_announcement_group-field');
    },
    setup: function setup(data) {
      var self = this;
      self.initial = {
        text: self.getValue('message_text', data),
        show_link: self.getValue('message_show_link', data)
      };
    },
    applyChange: function applyChange(data) {
      var self = this,
          text = self.getValue('message_text', data),
          show_link = self.getValue('message_show_link', data);
      var redraw = false;

      if (self.hasChanged('text', text) || self.hasChanged('show_link', show_link)) {
        self.live.setMessage({
          text: 'message_text',
          show_link: 'message_show_link',
          link_text: 'message_link_text',
          link_url: 'message_link_url',
          link_target: 'message_link_target'
        }, data);
        redraw = true;
      }

      self.finalize(redraw, false);
    }
  });

  _.live.register(new _.Live.Content_Announcement_Message());
})(FooBar.$, FooBar, FooBar.utils, FooBar.utils.is, FooBar.utils.obj, FooBar.utils.str);
"use strict";

(function ($, _, _utils, _is, _obj, _str) {
  _.Live.Content_Cookie_Button = _.Live.Field.extend({
    construct: function construct() {
      var self = this;

      self._super('foobar_notification-settings_cookie_button_group-field');

      self.positions = ['fbr-buttons-left', 'fbr-buttons-right'];
    },
    setup: function setup(data) {
      var self = this;
      self.initial = {
        text: self.getValue('cookie_button_text', data),
        position: self.getValue('cookie_button_position', data),
        show_decline: self.getValue('cookie_show_decline_button', data)
      };
    },
    applyChange: function applyChange(data) {
      var self = this,
          text = self.getValue('cookie_button_text', data),
          position = self.getValue('cookie_button_position', data),
          show_decline = self.getValue('cookie_show_decline_button', data);
      var redraw = false;

      if (self.hasChanged('text', text)) {
        self.live.bar.item.$el.find('.fbr-button:first').text(text);
        redraw = true;
      }

      if (self.hasChanged('position', position)) {
        self.live.setItemClass(position, self.positions);
        redraw = true;
      }

      if (self.hasChanged('show_decline', show_decline)) {
        var $secondary = self.live.bar.item.$el.find('.fbr-button-secondary:first');

        if (show_decline === 'yes') {
          var decline = {
            text: self.getValue('cookie_decline_button_text'),
            href: self.getValue('cookie_decline_button_url'),
            target: self.getValue('cookie_decline_button_target')
          };

          if ($secondary.length === 0) {
            $secondary = $('<a/>', {
              'class': 'fbr-button fbr-mobile-100 fbr-button-secondary',
              text: decline.text,
              href: decline.href,
              target: decline.target
            });
            self.live.bar.item.$el.find('.fbr-button:first').after($secondary);
          } else {
            $secondary.text(decline.text).attr({
              href: decline.url,
              target: decline.target
            });
          }
        } else {
          $secondary.remove();
        }

        redraw = true;
      }

      self.finalize(redraw, false);
    }
  });

  _.live.register(new _.Live.Content_Cookie_Button());
})(FooBar.$, FooBar, FooBar.utils, FooBar.utils.is, FooBar.utils.obj, FooBar.utils.str);
"use strict";

(function ($, _, _utils, _is, _obj, _str) {
  _.Live.Content_Cookie_ButtonSecondary = _.Live.Field.extend({
    construct: function construct() {
      var self = this;

      self._super('foobar_notification-settings_cookie_decline_button_group-field');
    },
    setup: function setup(data) {
      var self = this;
      self.initial = {
        text: self.getValue('cookie_decline_button_text', data),
        url: self.getValue('cookie_decline_button_url', data),
        target: self.getValue('cookie_decline_button_target', data)
      };
    },
    applyChange: function applyChange(data) {
      var self = this,
          text = self.getValue('cookie_decline_button_text', data),
          url = self.getValue('cookie_decline_button_url', data),
          target = self.getValue('cookie_decline_button_target', data);
      var redraw = false;

      if (self.hasChanged('text', text) || self.hasChanged('url', url) || self.hasChanged('target', target)) {
        self.live.bar.item.$el.find('.fbr-button-secondary:first').attr({
          href: url,
          target: target
        }).text(text);
        redraw = true;
      }

      self.finalize(redraw, false);
    }
  });

  _.live.register(new _.Live.Content_Cookie_ButtonSecondary());
})(FooBar.$, FooBar, FooBar.utils, FooBar.utils.is, FooBar.utils.obj, FooBar.utils.str);
"use strict";

(function ($, _, _utils, _is, _obj, _str) {
  _.Live.Content_Cookie_PolicyLink = _.Live.Field.extend({
    construct: function construct() {
      var self = this;

      self._super('foobar_notification-settings_cookie_policy_link_group-field');
    },
    setup: function setup(data) {
      var self = this;
      self.initial = {
        text: self.getValue('cookie_policy_link_text', data),
        url: self.getValue('cookie_policy_link_url', data),
        target: self.getValue('cookie_policy_link_target', data)
      };
    },
    applyChange: function applyChange(data) {
      var self = this,
          text = self.getValue('cookie_policy_link_text', data),
          url = self.getValue('cookie_policy_link_url', data),
          target = self.getValue('cookie_policy_link_target', data);
      var redraw = false;

      if (self.hasChanged('text', text) || self.hasChanged('url', url) || self.hasChanged('target', target)) {
        self.live.setMessage({
          text: 'cookie_notice',
          show_link: 'cookie_show_policy_link',
          link_text: 'cookie_policy_link_text',
          link_url: 'cookie_policy_link_url',
          link_target: 'cookie_policy_link_target'
        }, data);
        redraw = true;
      }

      self.finalize(redraw, false);
    }
  });

  _.live.register(new _.Live.Content_Cookie_PolicyLink());
})(FooBar.$, FooBar, FooBar.utils, FooBar.utils.is, FooBar.utils.obj, FooBar.utils.str);
"use strict";

(function ($, _, _utils, _is, _obj, _str) {
  _.Live.Content_Cookie_Message = _.Live.Field.extend({
    construct: function construct() {
      var self = this;

      self._super('foobar_notification-settings_cookie_group-field');
    },
    setup: function setup(data) {
      var self = this;
      self.initial = {
        text: self.getValue('cookie_notice', data),
        show_link: self.getValue('cookie_show_policy_link', data)
      };
    },
    applyChange: function applyChange(data) {
      var self = this,
          text = self.getValue('cookie_notice', data),
          show_link = self.getValue('cookie_show_policy_link', data);
      var redraw = false;

      if (self.hasChanged('text', text) || self.hasChanged('show_link', show_link)) {
        self.live.setMessage({
          text: 'cookie_notice',
          show_link: 'cookie_show_policy_link',
          link_text: 'cookie_policy_link_text',
          link_url: 'cookie_policy_link_url',
          link_target: 'cookie_policy_link_target'
        }, data);
        redraw = true;
      }

      self.finalize(redraw, false);
    }
  });

  _.live.register(new _.Live.Content_Cookie_Message());
})(FooBar.$, FooBar, FooBar.utils, FooBar.utils.is, FooBar.utils.obj, FooBar.utils.str);
"use strict";

(function ($, _, _utils, _is, _obj, _str) {
  _.Live.Content_Countdown_Button = _.Live.Field.extend({
    construct: function construct() {
      var self = this;

      self._super('foobar_notification-settings_countdown_button_field_group-field', null, _.Item.Countdown);

      self.positions = ['fbr-button-before-message', 'fbr-button-after-message'];
    },
    setup: function setup(data) {
      var self = this;
      self.initial = {
        text: self.getValue('countdown_button_text', data),
        url: self.getValue('countdown_button_url', data),
        target: self.getValue('countdown_button_target', data),
        position: self.getValue('countdown_button_position', data)
      };
    },
    applyChange: function applyChange(data) {
      var self = this,
          text = self.getValue('countdown_button_text', data),
          url = self.getValue('countdown_button_url', data),
          target = self.getValue('countdown_button_target', data),
          position = self.getValue('countdown_button_position', data);
      var redraw = false;

      if (self.hasChanged('text', text) || self.hasChanged('url', url) || self.hasChanged('target', target)) {
        self.live.bar.item.$el.find('.fbr-button:first').attr({
          href: url,
          target: target
        }).text(text);
        redraw = true;
      }

      if (self.hasChanged('position', position)) {
        self.live.setItemClass(position, self.positions);
        redraw = true;
      }

      self.finalize(redraw, false);
    }
  });

  _.live.register(new _.Live.Content_Countdown_Button());
})(FooBar.$, FooBar, FooBar.utils, FooBar.utils.is, FooBar.utils.obj, FooBar.utils.str);
"use strict";

(function ($, _, _utils, _is, _obj, _str) {
  _.Live.Content_Countdown_Countdown = _.Live.Field.extend({
    construct: function construct() {
      var self = this;

      self._super('foobar_notification-settings_countdown_countdown_field_group-field', null, _.Item.Countdown);

      self.styles = ['fbr-countdown-boxed', 'fbr-countdown-digital'];
      self.SECOND_IN_MS = 1000;
      self.MINUTE_IN_MS = 60 * self.SECOND_IN_MS;
      self.HOUR_IN_MS = 60 * self.MINUTE_IN_MS;
      self.DAY_IN_MS = 24 * self.HOUR_IN_MS;
      self.$fixed = null;
    },
    setup: function setup(data) {
      var self = this;
      self.initial = {
        mode: self.getValue('countdown_countdown_type', data),
        fixed: self.getTimestamp(data),
        relative: self.getTime(data),
        style: self.getValue('countdown_countdown_style', data)
      };
      self.$fixed = $('#foobar_notification-settings_countdown_countdown_timestamp-field');
    },
    applyChange: function applyChange(data) {
      var self = this,
          item = self.live.bar.item;
      if (!(item instanceof _.Item.Countdown)) return;
      var mode = self.getValue('countdown_countdown_type', data),
          fixed = self.getTimestamp(data),
          relative = self.getTime(data),
          style = self.getValue('countdown_countdown_style', data);
      var redraw = false;

      if (mode === 'timestamp' && (self.hasChanged('mode', mode) || self.hasChanged('fixed', fixed))) {
        var isExpired = fixed < Date.now();

        if (!isExpired) {
          item.target = fixed;

          if (!item.isRunning) {
            item.start();
          }

          redraw = true;
        }

        self.$fixed.toggleClass('foofields-error', isExpired);
      }

      if (mode === 'time' && (self.hasChanged('mode', mode) || self.hasChanged('relative', relative))) {
        item.target = Date.now() + relative;

        if (!item.isRunning) {
          item.start();
        }

        redraw = true;
      }

      if (self.hasChanged('style', style)) {
        self.live.setItemClass(style, self.styles);
        redraw = true;
      }

      self.finalize(redraw, false);
    },
    getTimestamp: function getTimestamp(data) {
      var self = this,
          dateString = self.getValue('foobar_notification-settings[countdown_countdown_timestamp][date]', data),
          hours = self.getValue('foobar_notification-settings[countdown_countdown_timestamp][hours]', data),
          minutes = self.getValue('foobar_notification-settings[countdown_countdown_timestamp][minutes]', data);
      var date = new Date(dateString);
      date.setHours(hours, minutes);
      return date.getTime();
    },
    getTime: function getTime(data) {
      var self = this,
          days = self.getValue('foobar_notification-settings[countdown_countdown_time][days]', data),
          hours = self.getValue('foobar_notification-settings[countdown_countdown_time][hours]', data),
          minutes = self.getValue('foobar_notification-settings[countdown_countdown_time][minutes]', data),
          seconds = self.getValue('foobar_notification-settings[countdown_countdown_time][seconds]', data);
      return days * self.DAY_IN_MS + hours * self.HOUR_IN_MS + minutes * self.MINUTE_IN_MS + seconds * self.SECOND_IN_MS;
    }
  });

  _.live.register(new _.Live.Content_Countdown_Countdown());
})(FooBar.$, FooBar, FooBar.utils, FooBar.utils.is, FooBar.utils.obj, FooBar.utils.str);
"use strict";

(function ($, _, _utils, _is, _obj, _str) {
  _.Live.Content_Countdown_ExpiredMessage = _.Live.Field.extend({
    construct: function construct() {
      var self = this;

      self._super('foobar_notification-settings_countdown_expired_field_group-field');

      self.target = null;
    },
    setup: function setup(data) {
      var self = this;
      self.initial = {
        text: self.getValue('countdown_expired_text', data),
        duration: self.getValue('countdown_expired_duration', data)
      };
      self.target = self.live.bar.getByType(_.Item.CountdownExpired);

      if (self.target instanceof _.Item.CountdownExpired) {
        self.target.opt.timeoutAction = 'resetTimeout';
      }

      self.live.on('tab-changed', function (event, id) {
        if (id === 'foobar_notification-settings_content_countdown_expired-content') self.showTarget();
      });
    },
    targetItem: function targetItem() {
      return this.target;
    },
    applyChange: function applyChange(data) {
      var self = this,
          text = self.getValue('countdown_expired_text', data),
          duration = self.getValue('countdown_expired_duration', data);
      var redraw = false;

      if (self.hasChanged('text', text)) {
        self.live.setMessage({
          text: 'countdown_expired_text'
        }, data);
        redraw = true;
      }

      if (self.hasChanged('duration', duration)) {
        var d = parseInt(duration);
        if (isNaN(d)) d = 0;
        d *= 1000;
        self.live.bar.item.setTimeout(d);
        redraw = true;
      }

      self.finalize(redraw, false);
    }
  });

  _.live.register(new _.Live.Content_Countdown_ExpiredMessage());
})(FooBar.$, FooBar, FooBar.utils, FooBar.utils.is, FooBar.utils.obj, FooBar.utils.str);
"use strict";

(function ($, _, _utils, _is, _obj, _str) {
  _.Live.Content_Countdown_Link = _.Live.Field.extend({
    construct: function construct() {
      var self = this;

      self._super('foobar_notification-settings_countdown_link_field_group-field', null, _.Item.Countdown);
    },
    setup: function setup(data) {
      var self = this;
      self.initial = {
        text: self.getValue('countdown_link_text', data),
        url: self.getValue('countdown_link_url', data),
        target: self.getValue('countdown_link_target', data)
      };
    },
    applyChange: function applyChange(data) {
      var self = this,
          text = self.getValue('countdown_link_text', data),
          url = self.getValue('countdown_link_url', data),
          target = self.getValue('countdown_link_target', data);
      var redraw = false;

      if (self.hasChanged('text', text) || self.hasChanged('url', url) || self.hasChanged('target', target)) {
        self.live.setMessage({
          text: 'countdown_text',
          show_link: 'countdown_show_link',
          link_text: 'countdown_link_text',
          link_url: 'countdown_link_url',
          link_target: 'countdown_link_target'
        }, data);
        redraw = true;
      }

      self.finalize(redraw, false);
    }
  });

  _.live.register(new _.Live.Content_Countdown_Link());
})(FooBar.$, FooBar, FooBar.utils, FooBar.utils.is, FooBar.utils.obj, FooBar.utils.str);
"use strict";

(function ($, _, _utils, _is, _obj, _str) {
  _.Live.Content_Countdown_Message = _.Live.Field.extend({
    construct: function construct() {
      var self = this;

      self._super('foobar_notification-settings_countdown_message_field_group-field', null, _.Item.Countdown);

      self.positions = ['fbr-message-before-countdown', 'fbr-message-after-countdown'];
    },
    setup: function setup(data) {
      var self = this;
      self.initial = {
        text: self.getValue('countdown_text', data),
        position: self.getValue('countdown_message_position', data),
        show_link: self.getValue('countdown_show_link', data)
      };
      self.live.on('tab-changed', function (event, id) {
        if (id === 'foobar_notification-settings_content-countdown-content') self.showTarget();
      });
    },
    applyChange: function applyChange(data) {
      var self = this,
          text = self.getValue('countdown_text', data),
          position = self.getValue('countdown_message_position', data),
          show_link = self.getValue('countdown_show_link', data);
      var redraw = false;

      if (self.hasChanged('text', text) || self.hasChanged('show_link', show_link)) {
        self.live.setMessage({
          text: 'countdown_text',
          show_link: 'countdown_show_link',
          link_text: 'countdown_link_text',
          link_url: 'countdown_link_url',
          link_target: 'countdown_link_target'
        }, data);
        redraw = true;
      }

      if (self.hasChanged('position', position)) {
        self.live.setItemClass(position, self.positions);
        redraw = true;
      }

      self.finalize(redraw, false);
    }
  });

  _.live.register(new _.Live.Content_Countdown_Message());
})(FooBar.$, FooBar, FooBar.utils, FooBar.utils.is, FooBar.utils.obj, FooBar.utils.str);
"use strict";

(function ($, _, _utils, _is, _obj, _str) {
  _.Live.Content_CTA_Button = _.Live.Field.extend({
    construct: function construct() {
      var self = this;

      self._super('foobar_notification-settings_cta_button_group-field');

      self.positions = ['fbr-buttons-left', 'fbr-buttons-right'];
    },
    setup: function setup(data) {
      var self = this;
      self.initial = {
        text: self.getValue('cta_button_text', data),
        url: self.getValue('cta_button_url', data),
        target: self.getValue('cta_button_target', data),
        position: self.getValue('cta_button_position', data)
      };
    },
    applyChange: function applyChange(data) {
      var self = this,
          text = self.getValue('cta_button_text', data),
          url = self.getValue('cta_button_url', data),
          target = self.getValue('cta_button_target', data),
          position = self.getValue('cta_button_position', data);
      var redraw = false;

      if (self.hasChanged('text', text) || self.hasChanged('url', url) || self.hasChanged('target', target)) {
        self.live.bar.item.$el.find('.fbr-button:first').attr({
          href: url,
          target: target
        }).text(text);
        redraw = true;
      }

      if (self.hasChanged('position', position)) {
        self.live.setItemClass(position, self.positions);
        redraw = true;
      }

      self.finalize(redraw, false);
    }
  });

  _.live.register(new _.Live.Content_CTA_Button());
})(FooBar.$, FooBar, FooBar.utils, FooBar.utils.is, FooBar.utils.obj, FooBar.utils.str);
"use strict";

(function ($, _, _utils, _is, _obj, _str) {
  _.Live.Content_CTA_Link = _.Live.Field.extend({
    construct: function construct() {
      var self = this;

      self._super('foobar_notification-settings_cta_link_group-field');
    },
    setup: function setup(data) {
      var self = this;
      self.initial = {
        text: self.getValue('cta_link_text', data),
        url: self.getValue('cta_link_url', data),
        target: self.getValue('cta_link_target', data)
      };
    },
    applyChange: function applyChange(data) {
      var self = this,
          text = self.getValue('cta_link_text', data),
          url = self.getValue('cta_link_url', data),
          target = self.getValue('cta_link_target', data);
      var redraw = false;

      if (self.hasChanged('text', text) || self.hasChanged('url', url) || self.hasChanged('target', target)) {
        self.live.setMessage({
          text: 'cta_text',
          show_link: 'cta_show_link',
          link_text: 'cta_link_text',
          link_url: 'cta_link_url',
          link_target: 'cta_link_target'
        }, data);
        redraw = true;
      }

      self.finalize(redraw, false);
    }
  });

  _.live.register(new _.Live.Content_CTA_Link());
})(FooBar.$, FooBar, FooBar.utils, FooBar.utils.is, FooBar.utils.obj, FooBar.utils.str);
"use strict";

(function ($, _, _utils, _is, _obj, _str) {
  _.Live.Content_CTA_Message = _.Live.Field.extend({
    construct: function construct() {
      var self = this;

      self._super('foobar_notification-settings_cta_group-field');
    },
    setup: function setup(data) {
      var self = this;
      self.initial = {
        text: self.getValue('cta_text', data),
        show_link: self.getValue('cta_show_link', data)
      };
    },
    applyChange: function applyChange(data) {
      var self = this,
          text = self.getValue('cta_text', data),
          show_link = self.getValue('cta_show_link', data);
      var redraw = false;

      if (self.hasChanged('text', text) || self.hasChanged('show_link', show_link)) {
        self.live.setMessage({
          text: 'cta_text',
          show_link: 'cta_show_link',
          link_text: 'cta_link_text',
          link_url: 'cta_link_url',
          link_target: 'cta_link_target'
        }, data);
        redraw = true;
      }

      self.finalize(redraw, false);
    }
  });

  _.live.register(new _.Live.Content_CTA_Message());
})(FooBar.$, FooBar, FooBar.utils, FooBar.utils.is, FooBar.utils.obj, FooBar.utils.str);
"use strict";

(function (_, _is, _obj) {
  _.Live.freeShippingData = function (bar) {
    var data = {
      target: 50,
      str_target: "$50.00",
      current: 30,
      str_current: "$30.00",
      percent: 0.6,
      str_percent: "60%"
    };

    if (bar instanceof _.Bar.FreeShipping && _is.hash(bar.opt.data)) {
      _obj.extend(data, bar.opt.data);
    }

    return data;
  };

  _.Live.freeShippingFormat = function (text, bar) {
    var data = _.Live.freeShippingData(bar);

    return text.replace(/(?<![a-z])\$(target|current|percent)(?![a-z])/g, function (match, p1) {
      switch (p1) {
        case "target":
          return data.str_target;

        case "current":
          return data.str_current;

        case "percent":
          return data.str_percent;

        default:
          // if no case then just return the whole match
          return match;
      }
    });
  };
})(FooBar, FooBar.utils.is, FooBar.utils.obj);
"use strict";

(function ($, _, _utils, _is, _obj, _str) {
  _.Live.Appearance_Customizer_FreeShipping = _.Live.CustomizerField.extend({
    construct: function construct() {
      this._super('foobar_notification-settings_free_shipping_progress_progress_bar_field_group-field', ['has_progress_bar'], _.Item.FreeShippingProgress);
    },
    setup: function setup(data) {
      var self = this;

      self._super(data, {
        background: self.getValue('free_shipping_progress_progress_bar_background', data),
        fill: self.getValue('free_shipping_progress_progress_bar_fill', data),
        text: self.getValue('free_shipping_progress_progress_bar_text', data),
        icon: self.getValue('free_shipping_progress_progress_bar_icon', data),
        border_size: self.getValue('free_shipping_progress_progress_bar_border_size', data),
        border_radius: self.getValue('free_shipping_progress_progress_bar_border_radius', data)
      });
    },
    applyChange: function applyChange(data, init) {
      this._super(data, init); // force a redraw as the border size may have affected the height


      this.finalize(true, false);
    },
    toCSS: function toCSS(barId, data, init) {
      var self = this,
          values = {
        background: self.getValue('free_shipping_progress_progress_bar_background', data),
        fill: self.getValue('free_shipping_progress_progress_bar_fill', data),
        text: self.getValue('free_shipping_progress_progress_bar_text', data),
        icon: self.getValue('free_shipping_progress_progress_bar_icon', data),
        border_size: self.getValue('free_shipping_progress_progress_bar_border_size', data),
        border_radius: self.getValue('free_shipping_progress_progress_bar_border_radius', data)
      };
      var css = '';
      css += '\n#' + barId + '.fbr-custom-color .fbr-progress-bar {';
      css += '\n\t--foobar-progress-background-color: ' + values.background + ';';
      css += '\n\t--foobar-progress-fill-color: ' + values.fill + ';';
      css += '\n\t--foobar-progress-text-color: ' + values.text + ';';
      css += '\n\t--foobar-progress-icon-color: ' + values.icon + ';';
      css += '\n\t--foobar-progress-border-size: ' + values.border_size + 'px;';
      css += '\n\t--foobar-progress-border-radius: ' + values.border_radius + 'px;';
      css += '\n}';
      return css;
    }
  });

  _.live.register(new _.Live.Appearance_Customizer_FreeShipping());
})(FooBar.$, FooBar, FooBar.utils, FooBar.utils.is, FooBar.utils.obj, FooBar.utils.str);
"use strict";

(function ($, _, _utils, _is, _obj, _str) {
  _.Live.Appearance_Icons_FreeShipping = _.Live.Field.extend({
    construct: function construct() {
      var self = this;

      self._super('foobar_notification-settings_icons_free_shipping_field_group-field', ['has_buttons'], _.Item.FreeShippingQualified);
    },
    setup: function setup(data) {
      var self = this;
      self.initial = {
        progress: self.getValue('free_shipping_icon_progress', data),
        cart: self.getValue('free_shipping_icon_cart', data),
        checkout: self.getValue('free_shipping_icon_checkout', data)
      };
    },
    applyChange: function applyChange(data) {
      var self = this,
          progress = self.getValue('free_shipping_icon_progress', data),
          cart = self.getValue('free_shipping_icon_cart', data),
          checkout = self.getValue('free_shipping_icon_checkout', data);

      if (self.hasChanged('progress', progress)) {
        self.live.setIcon('progress', progress);
      }

      if (self.hasChanged('cart', cart)) {
        self.live.setIcon('cart', cart);
      }

      if (self.hasChanged('checkout', checkout)) {
        self.live.setIcon('checkout', checkout);
      }
    }
  });

  _.live.register(new _.Live.Appearance_Icons_FreeShipping());
})(FooBar.$, FooBar, FooBar.utils, FooBar.utils.is, FooBar.utils.obj, FooBar.utils.str);
"use strict";

(function ($, _, _utils, _is, _obj, _str) {
  _.Live.Content_FreeShipping_Link = _.Live.Field.extend({
    construct: function construct() {
      var self = this;

      self._super('foobar_notification-settings_free_shipping_initial_link_field_group-field');
    },
    setup: function setup(data) {
      var self = this;
      self.initial = {
        text: self.getValue('free_shipping_initial_link_text', data),
        url: self.getValue('free_shipping_initial_link_url', data),
        target: self.getValue('free_shipping_initial_link_target', data)
      };
    },
    applyChange: function applyChange(data) {
      var self = this,
          text = self.getValue('free_shipping_initial_link_text', data),
          url = self.getValue('free_shipping_initial_link_url', data),
          target = self.getValue('free_shipping_initial_link_target', data);
      var redraw = false;

      if (self.hasChanged('text', text) || self.hasChanged('url', url) || self.hasChanged('target', target)) {
        self.live.setMessageDirect({
          text: _.Live.freeShippingFormat(self.getValue('free_shipping_initial_text', data), self.live.bar),
          show_link: self.getValue('free_shipping_initial_show_link', data),
          link_text: text,
          link_url: url,
          link_target: target
        }, data);
        redraw = true;
      }

      self.finalize(redraw, false);
    }
  });

  _.live.register(new _.Live.Content_FreeShipping_Link());
})(FooBar.$, FooBar, FooBar.utils, FooBar.utils.is, FooBar.utils.obj, FooBar.utils.str);
"use strict";

(function ($, _, _utils, _is, _obj, _str) {
  _.Live.Content_FreeShipping_Message = _.Live.Field.extend({
    construct: function construct() {
      var self = this;

      self._super('foobar_notification-settings_free_shipping_initial_group-field');
    },
    setup: function setup(data) {
      var self = this;
      self.initial = {
        text: self.getValue('free_shipping_initial_text', data),
        show_link: self.getValue('free_shipping_initial_show_link', data)
      };
      self.live.on('tab-changed', function (event, id) {
        if (id === 'foobar_notification-settings_content_free_shipping-content') self.showTarget();
      });
    },
    applyChange: function applyChange(data) {
      var self = this,
          text = self.getValue('free_shipping_initial_text', data),
          show_link = self.getValue('free_shipping_initial_show_link', data);
      var redraw = false;

      if (self.hasChanged('text', text) || self.hasChanged('show_link', show_link)) {
        self.live.setMessageDirect({
          text: _.Live.freeShippingFormat(text, self.live.bar),
          show_link: show_link,
          link_text: self.live.getValue('free_shipping_initial_link_text', data),
          link_url: self.live.getValue('free_shipping_initial_link_url', data),
          link_target: self.live.getValue('free_shipping_initial_link_target', data)
        }, data);
        redraw = true;
      }

      self.finalize(redraw, false);
    }
  });

  _.live.register(new _.Live.Content_FreeShipping_Message());
})(FooBar.$, FooBar, FooBar.utils, FooBar.utils.is, FooBar.utils.obj, FooBar.utils.str);
"use strict";

(function ($, _, _utils, _is, _obj, _str) {
  _.Live.Content_FreeShipping_ProgressBar = _.Live.Field.extend({
    construct: function construct() {
      var self = this;

      self._super('foobar_notification-settings_free_shipping_progress_progress_bar_group-field', ['has_progress_bar'], _.Item.FreeShippingProgress);

      self._contentValues = ['icon-only', 'text-only', 'icon-and-text'];
      self._contentClasses = self._contentValues.reduce(function (result, value) {
        result.push('fbr-progress-' + value);
        return result;
      }, []).join(' ');
      self._sizeValues = ['medium', 'small'];
      self._sizeClasses = self._sizeValues.reduce(function (result, value) {
        result.push('fbr-progress-' + value);
        return result;
      }, []).join(' ');
    },
    setup: function setup(data) {
      var self = this;
      self.initial = {
        content: self.getValue('free_shipping_progress_progress_bar_content', data),
        size: self.getValue('free_shipping_progress_progress_bar_size', data)
      };
    },
    applyChange: function applyChange(data) {
      var self = this,
          content = self.getValue('free_shipping_progress_progress_bar_content', data),
          size = self.getValue('free_shipping_progress_progress_bar_size', data);
      var redraw = false;

      if (self.hasChanged('content', content)) {
        if (self.live.bar.item instanceof _.Item.FreeShippingProgress) {
          self.live.bar.item.$progress.removeClass(self._contentClasses);

          if (self._contentValues.includes(content)) {
            self.live.bar.item.$progress.addClass('fbr-progress-' + content);
          }

          redraw = true;
        }
      }

      if (self.hasChanged('size', size)) {
        if (self.live.bar.item instanceof _.Item.FreeShippingProgress) {
          self.live.bar.item.$progress.removeClass(self._sizeClasses);

          if (self._sizeValues.includes(size)) {
            self.live.bar.item.$progress.addClass('fbr-progress-' + size);
          }

          redraw = true;
        }
      }

      self.finalize(redraw, false);
    }
  });

  _.live.register(new _.Live.Content_FreeShipping_ProgressBar());
})(FooBar.$, FooBar, FooBar.utils, FooBar.utils.is, FooBar.utils.obj, FooBar.utils.str);
"use strict";

(function ($, _, _utils, _is, _obj, _str) {
  _.Live.Content_FreeShipping_ProgressMessage = _.Live.Field.extend({
    construct: function construct() {
      var self = this;

      self._super('foobar_notification-settings_free_shipping_progress_group-field', ['has_progress_bar'], _.Item.FreeShippingProgress);
    },
    setup: function setup(data) {
      var self = this;
      self.initial = {
        text: self.getValue('free_shipping_progress_text', data),
        show_progress_bar: self.getValue('free_shipping_progress_show_progress_bar', data)
      };
      self.live.on('tab-changed', function (event, id) {
        if (id === 'foobar_notification-settings_content_free_shipping_progress-content') self.showTarget();
      });
    },
    applyChange: function applyChange(data) {
      var self = this,
          text = self.getValue('free_shipping_progress_text', data),
          show_progress_bar = self.getValue('free_shipping_progress_show_progress_bar', data);
      var redraw = false;

      if (self.hasChanged('text', text)) {
        self.live.setMessageDirect({
          text: _.Live.freeShippingFormat(text, self.live.bar)
        }, data);
        redraw = true;
      }

      if (self.hasChanged('show_progress_bar', show_progress_bar)) {
        self.live.toggleItemClass('fbr-hide-progress-bar', show_progress_bar === 'no');
        redraw = true;
      }

      self.finalize(redraw, false);
    }
  });

  _.live.register(new _.Live.Content_FreeShipping_ProgressMessage());
})(FooBar.$, FooBar, FooBar.utils, FooBar.utils.is, FooBar.utils.obj, FooBar.utils.str);
"use strict";

(function ($, _, _utils, _is, _obj, _str) {
  _.Live.Content_FreeShipping_QualifiedCartButton = _.Live.Field.extend({
    construct: function construct() {
      var self = this;

      self._super('foobar_notification-settings_free_shipping_qualified_cart_button_group-field', ['has_buttons'], _.Item.FreeShippingQualified);
    },
    setup: function setup(data) {
      var self = this;
      self.initial = {
        show_button: self.getValue('free_shipping_qualified_show_cart_button', data),
        icon: self.getValue('free_shipping_icon_cart', data),
        show_icon: self.getValue('free_shipping_qualified_cart_button_show_icon', data),
        text: self.getValue('free_shipping_qualified_cart_button_text', data),
        href: self.getValue('free_shipping_qualified_cart_button_url', data),
        target: self.getValue('free_shipping_qualified_cart_button_target', data)
      };
    },
    applyChange: function applyChange(data) {
      var self = this,
          show_cart_button = self.getValue('free_shipping_qualified_show_cart_button', data),
          show_checkout_button = self.getValue('free_shipping_qualified_show_checkout_button', data),
          values = {
        show_button: show_cart_button,
        icon: self.getValue('free_shipping_icon_cart', data),
        show_icon: self.getValue('free_shipping_qualified_cart_button_show_icon', data),
        text: self.getValue('free_shipping_qualified_cart_button_text', data),
        href: self.getValue('free_shipping_qualified_cart_button_url', data),
        target: self.getValue('free_shipping_qualified_cart_button_target', data),
        mobile: show_cart_button === 'yes' && show_checkout_button === 'yes' ? 'fbr-mobile-50' : 'fbr-mobile-100'
      };
      var redraw = false;

      if (self.hasChanged('show_button', values.show_button) || self.hasChanged('icon', values.icon) || self.hasChanged('show_icon', values.show_icon) || self.hasChanged('text', values.text) || self.hasChanged('href', values.href) || self.hasChanged('target', values.target)) {
        self.live.setButton('fbr-button-cart', values, false);
        redraw = true;
      }

      self.finalize(redraw, false);
    }
  });

  _.live.register(new _.Live.Content_FreeShipping_QualifiedCartButton());
})(FooBar.$, FooBar, FooBar.utils, FooBar.utils.is, FooBar.utils.obj, FooBar.utils.str);
"use strict";

(function ($, _, _utils, _is, _obj, _str) {
  _.Live.Content_FreeShipping_QualifiedCheckoutButton = _.Live.Field.extend({
    construct: function construct() {
      var self = this;

      self._super('foobar_notification-settings_free_shipping_qualified_checkout_button_group-field', ['has_buttons'], _.Item.FreeShippingQualified);
    },
    setup: function setup(data) {
      var self = this;
      self.initial = {
        show_button: self.getValue('free_shipping_qualified_show_checkout_button', data),
        icon: self.getValue('free_shipping_icon_checkout', data),
        show_icon: self.getValue('free_shipping_qualified_checkout_button_show_icon', data),
        text: self.getValue('free_shipping_qualified_checkout_button_text', data),
        href: self.getValue('free_shipping_qualified_checkout_button_url', data),
        target: self.getValue('free_shipping_qualified_checkout_button_target', data)
      };
    },
    applyChange: function applyChange(data) {
      var self = this,
          show_cart_button = self.getValue('free_shipping_qualified_show_cart_button', data),
          show_checkout_button = self.getValue('free_shipping_qualified_show_checkout_button', data),
          values = {
        show_button: show_checkout_button,
        icon: self.getValue('free_shipping_icon_checkout', data),
        show_icon: self.getValue('free_shipping_qualified_checkout_button_show_icon', data),
        text: self.getValue('free_shipping_qualified_checkout_button_text', data),
        href: self.getValue('free_shipping_qualified_checkout_button_url', data),
        target: self.getValue('free_shipping_qualified_checkout_button_target', data),
        mobile: show_cart_button === 'yes' && show_checkout_button === 'yes' ? 'fbr-mobile-50' : 'fbr-mobile-100'
      };
      var redraw = false;

      if (self.hasChanged('show_button', values.show_button) || self.hasChanged('icon', values.icon) || self.hasChanged('show_icon', values.show_icon) || self.hasChanged('text', values.text) || self.hasChanged('href', values.href) || self.hasChanged('target', values.target)) {
        self.live.setButton('fbr-button-checkout', values, show_cart_button === 'yes');
        redraw = true;
      }

      self.finalize(redraw, false);
    }
  });

  _.live.register(new _.Live.Content_FreeShipping_QualifiedCheckoutButton());
})(FooBar.$, FooBar, FooBar.utils, FooBar.utils.is, FooBar.utils.obj, FooBar.utils.str);
"use strict";

(function ($, _, _utils, _is, _obj, _str) {
  _.Live.Content_FreeShipping_QualifiedMessage = _.Live.Field.extend({
    construct: function construct() {
      var self = this;

      self._super('foobar_notification-settings_free_shipping_qualified_group-field', ['has_buttons'], _.Item.FreeShippingQualified);
    },
    setup: function setup(data) {
      var self = this;
      self.initial = {
        text: self.getValue('free_shipping_qualified_text', data),
        show_cart_button: self.getValue('free_shipping_qualified_show_cart_button', data),
        show_checkout_button: self.getValue('free_shipping_qualified_show_checkout_button', data)
      };
      self.live.on('tab-changed', function (event, id) {
        if (id === 'foobar_notification-settings_content_free_shipping_qualified-content') self.showTarget();
      });
    },
    applyChange: function applyChange(data) {
      var self = this,
          text = self.getValue('free_shipping_qualified_text', data),
          show_cart_button = self.getValue('free_shipping_qualified_show_cart_button', data),
          show_checkout_button = self.getValue('free_shipping_qualified_show_checkout_button', data);
      var redraw = false;

      if (self.hasChanged('text', text)) {
        self.live.setMessageDirect({
          text: _.Live.freeShippingFormat(text, self.live.bar)
        }, data);
        redraw = true;
      }

      if (self.hasChanged('show_cart_button', show_cart_button) || self.hasChanged('show_checkout_button', show_checkout_button)) {
        var values = {
          icon: self.getValue('free_shipping_icon_cart', data),
          show_icon: self.getValue('free_shipping_qualified_cart_button_show_icon', data),
          show_button: show_cart_button,
          text: self.getValue('free_shipping_qualified_cart_button_text', data),
          href: self.getValue('free_shipping_qualified_cart_button_url', data),
          target: self.getValue('free_shipping_qualified_cart_button_target', data),
          mobile: show_cart_button === 'yes' && show_checkout_button === 'yes' ? 'fbr-mobile-50' : 'fbr-mobile-100'
        };
        self.live.setButton('fbr-button-cart', values, false);
        var values2 = {
          icon: self.getValue('free_shipping_icon_checkout', data),
          show_icon: self.getValue('free_shipping_qualified_cart_button_show_icon', data),
          show_button: show_checkout_button,
          text: self.getValue('free_shipping_qualified_checkout_button_text', data),
          href: self.getValue('free_shipping_qualified_checkout_button_url', data),
          target: self.getValue('free_shipping_qualified_checkout_button_target', data),
          mobile: show_cart_button === 'yes' && show_checkout_button === 'yes' ? 'fbr-mobile-50' : 'fbr-mobile-100'
        };
        self.live.setButton('fbr-button-checkout', values2, show_cart_button === 'yes');
        redraw = true;
      }

      self.finalize(redraw, false);
    }
  });

  _.live.register(new _.Live.Content_FreeShipping_QualifiedMessage());
})(FooBar.$, FooBar, FooBar.utils, FooBar.utils.is, FooBar.utils.obj, FooBar.utils.str);
"use strict";

(function ($, _, _utils, _is, _obj, _str) {
  _.Live.Content_SignUp_ErrorMessage = _.Live.Field.extend({
    construct: function construct() {
      var self = this;

      self._super('foobar_notification-settings_sign_up_error_field_group-field', null, _.Item.SignUpError);
    },
    setup: function setup(data) {
      var self = this;
      self.initial = {
        text: self.getValue('sign_up_error_text', data),
        button_text: self.getValue('sign_up_error_button_text', data),
        duration: self.getValue('sign_up_error_duration', data)
      };
      self.live.on('tab-changed', function (event, id) {
        if (id === 'foobar_notification-settings_content_sign_up_error-content') self.showTarget();
      });
    },
    targetItem: function targetItem() {
      var target = this.live.bar.getByType(_.Item.SignUpError);

      if (target instanceof _.Item.SignUpError) {
        target.opt.timeoutAction = 'resetTimeout';
        return target;
      }

      return null;
    },
    applyChange: function applyChange(data) {
      var self = this,
          text = self.getValue('sign_up_error_text', data),
          button_text = self.getValue('sign_up_error_button_text', data),
          duration = self.getValue('sign_up_error_duration', data);
      var redraw = false;

      if (self.hasChanged('text', text)) {
        self.live.setMessage({
          text: 'sign_up_error_text'
        }, data);
        redraw = true;
      }

      if (self.hasChanged('button_text', button_text)) {
        self.live.bar.item.$el.find('.fbr-button:first').text(button_text);
        redraw = true;
      }

      if (self.hasChanged('duration', duration)) {
        var d = parseInt(duration);
        if (isNaN(d)) d = 0;
        d *= 1000;
        self.live.bar.item.setTimeout(d);
        redraw = true;
      }

      self.finalize(redraw, false);
    }
  });

  _.live.register(new _.Live.Content_SignUp_ErrorMessage());
})(FooBar.$, FooBar, FooBar.utils, FooBar.utils.is, FooBar.utils.obj, FooBar.utils.str);
"use strict";

(function ($, _, _utils, _is, _obj, _str) {
  _.Live.Content_SignUp_Form = _.Live.Field.extend({
    construct: function construct() {
      var self = this;

      self._super('foobar_notification-settings_sign_up_form_field_group-field');
    },
    setup: function setup(data) {
      var self = this;
      self.initial = {
        placeholder: self.getValue('sign_up_placeholder', data),
        button_text: self.getValue('sign_up_button_text', data)
      };
    },
    applyChange: function applyChange(data) {
      var self = this,
          placeholder = self.getValue('sign_up_placeholder', data),
          button_text = self.getValue('sign_up_button_text', data);
      var redraw = false;

      if (self.hasChanged('placeholder', placeholder)) {
        self.live.bar.item.$el.find('.fbr-email').attr('placeholder', placeholder);
        redraw = true;
      }

      if (self.hasChanged('button_text', button_text)) {
        self.live.bar.item.$el.find('.fbr-submit').text(button_text);
        redraw = true;
      }

      self.finalize(redraw, false);
    }
  });

  _.live.register(new _.Live.Content_SignUp_Form());
})(FooBar.$, FooBar, FooBar.utils, FooBar.utils.is, FooBar.utils.obj, FooBar.utils.str);
"use strict";

(function ($, _, _utils, _is, _obj, _str) {
  _.Live.Content_SignUp_Link = _.Live.Field.extend({
    construct: function construct() {
      var self = this;

      self._super('foobar_notification-settings_sign_up_link_field_group-field');
    },
    setup: function setup(data) {
      var self = this;
      self.initial = {
        text: self.getValue('sign_up_link_text', data),
        url: self.getValue('sign_up_link_url', data),
        target: self.getValue('sign_up_link_target', data)
      };
    },
    applyChange: function applyChange(data) {
      var self = this,
          text = self.getValue('sign_up_link_text', data),
          url = self.getValue('sign_up_link_url', data),
          target = self.getValue('sign_up_link_target', data);
      var redraw = false;

      if (self.hasChanged('text', text) || self.hasChanged('url', url) || self.hasChanged('target', target)) {
        self.live.setMessage({
          text: 'sign_up_text',
          show_link: 'sign_up_show_link',
          link_text: 'sign_up_link_text',
          link_url: 'sign_up_link_url',
          link_target: 'sign_up_link_target'
        }, data);
        redraw = true;
      }

      self.finalize(redraw, false);
    }
  });

  _.live.register(new _.Live.Content_SignUp_Link());
})(FooBar.$, FooBar, FooBar.utils, FooBar.utils.is, FooBar.utils.obj, FooBar.utils.str);
"use strict";

(function ($, _, _utils, _is, _obj, _str) {
  _.Live.Content_SignUp_Message = _.Live.Field.extend({
    construct: function construct() {
      var self = this;

      self._super('foobar_notification-settings_sign_up_message_field_group-field', null, _.Item.SignUp);
    },
    setup: function setup(data) {
      var self = this;
      self.initial = {
        text: self.getValue('sign_up_text', data),
        show_link: self.getValue('sign_up_show_link', data)
      };
      self.live.on('tab-changed', function (event, id) {
        if (id === 'foobar_notification-settings_content-sign-up-content') self.showTarget();
      });
    },
    applyChange: function applyChange(data) {
      var self = this,
          text = self.getValue('sign_up_text', data),
          show_link = self.getValue('sign_up_show_link', data);
      var redraw = false;

      if (self.hasChanged('text', text) || self.hasChanged('show_link', show_link)) {
        self.live.setMessage({
          text: 'sign_up_text',
          show_link: 'sign_up_show_link',
          link_text: 'sign_up_link_text',
          link_url: 'sign_up_link_url',
          link_target: 'sign_up_link_target'
        }, data);
        redraw = true;
      }

      self.finalize(redraw, false);
    }
  });

  _.live.register(new _.Live.Content_SignUp_Message());
})(FooBar.$, FooBar, FooBar.utils, FooBar.utils.is, FooBar.utils.obj, FooBar.utils.str);
"use strict";

(function ($, _, _utils, _is, _obj, _str) {
  _.Live.Content_SignUp_SuccessMessage = _.Live.Field.extend({
    construct: function construct() {
      var self = this;

      self._super('foobar_notification-settings_sign_up_success_field_group-field', null, _.Item.SignUpSuccess);
    },
    setup: function setup(data) {
      var self = this;
      self.initial = {
        text: self.getValue('sign_up_success_text', data),
        duration: self.getValue('sign_up_success_duration', data)
      };
      self.live.on('tab-changed', function (event, id) {
        if (id === 'foobar_notification-settings_content_sign_up_success-content') self.showTarget();
      });
    },
    targetItem: function targetItem() {
      var target = this.live.bar.getByType(_.Item.SignUpSuccess);

      if (target instanceof _.Item.SignUpSuccess) {
        target.opt.timeoutAction = 'resetTimeout';
        return target;
      }

      return null;
    },
    applyChange: function applyChange(data) {
      var self = this,
          text = self.getValue('sign_up_success_text', data),
          duration = self.getValue('sign_up_success_duration', data);
      var redraw = false;

      if (self.hasChanged('text', text) || self.hasChanged('duration', duration)) {
        self.live.setMessage({
          text: 'sign_up_success_text'
        }, data);
        var d = parseInt(duration);
        if (isNaN(d)) d = 0;
        d *= 1000;
        self.live.bar.item.setTimeout(d);
        redraw = true;
      }

      self.finalize(redraw, false);
    }
  });

  _.live.register(new _.Live.Content_SignUp_SuccessMessage());
})(FooBar.$, FooBar, FooBar.utils, FooBar.utils.is, FooBar.utils.obj, FooBar.utils.str);
"use strict";

(function (_, _is, _obj) {
  _.Live.tweetFormat = function (text) {
    return text.replace(/\B(!?)(@)(\w+)/i, function (match, p1, p2, p3) {
      var str = p2 + p3;
      if (p1 === '!') return str;
      return '<a href="https://twitter.com/' + p3 + '" target="_blank" class="fbr-inline-link">' + str + '</a>';
    });
  };
})(FooBar, FooBar.utils.is, FooBar.utils.obj);
"use strict";

(function ($, _, _utils, _is, _obj, _str) {
  _.Live.Content_Tweet_Button = _.Live.Field.extend({
    construct: function construct() {
      var self = this;

      self._super('foobar_notification-settings_tweet_button_group-field');

      self.positions = ['fbr-buttons-left', 'fbr-buttons-right'];
    },
    setup: function setup(data) {
      var self = this;
      self.initial = {
        text: self.getValue('tweet_button_text', data),
        icon: self.getValue('tweet_button_icon', data),
        colors: self.getValue('tweet_button_color', data),
        target: self.getValue('tweet_button_target', data),
        position: self.getValue('tweet_button_position', data)
      };
    },
    applyChange: function applyChange(data) {
      var self = this,
          text = self.getValue('tweet_button_text', data),
          icon = self.getValue('tweet_button_icon', data),
          colors = self.getValue('tweet_button_color', data),
          target = self.getValue('tweet_button_target', data),
          position = self.getValue('tweet_button_position', data);
      var redraw = false;

      if (self.hasChanged('text', text) || self.hasChanged('icon', icon) || self.hasChanged('colors', colors) || self.hasChanged('target', target)) {
        var bar = self.live.bar;
        var $button = bar.item.$el.find('.fbr-button:first').toggleClass('fbr-no-icon', icon === 'no').toggleClass('fbr-twitter-colors', colors === 'yes').attr({
          href: '#foobar_placehholder',
          target: target
        }).text(text);

        if (icon === 'yes') {
          var _icon = _.icons.get("twitter", bar.opt.svg, [bar.item.cls.buttonIcon]);

          $button.prepend(_icon);
        }

        redraw = true;
      }

      if (self.hasChanged('position', position)) {
        self.live.setItemClass(position, self.positions);
        redraw = true;
      }

      self.finalize(redraw, false);
    }
  });

  _.live.register(new _.Live.Content_Tweet_Button());
})(FooBar.$, FooBar, FooBar.utils, FooBar.utils.is, FooBar.utils.obj, FooBar.utils.str);
"use strict";

(function ($, _, _utils, _is, _obj, _str) {
  _.Live.Content_Tweet_Link = _.Live.Field.extend({
    construct: function construct() {
      var self = this;

      self._super('foobar_notification-settings_tweet_link_group-field');
    },
    setup: function setup(data) {
      var self = this;
      self.initial = {
        text: self.getValue('tweet_link_text', data),
        url: self.getValue('tweet_link_url', data),
        target: self.getValue('tweet_link_target', data)
      };
    },
    applyChange: function applyChange(data) {
      var self = this,
          text = self.getValue('tweet_link_text', data),
          url = self.getValue('tweet_link_url', data),
          target = self.getValue('tweet_link_target', data);
      var redraw = false;

      if (self.hasChanged('text', text) || self.hasChanged('url', url) || self.hasChanged('target', target)) {
        self.live.setMessageDirect({
          text: _.Live.tweetFormat(self.getValue('tweet_text', data)),
          show_link: self.getValue('tweet_show_link', data),
          link_text: text,
          link_url: url,
          link_target: target
        }, data);
        redraw = true;
      }

      self.finalize(redraw, false);
    }
  });

  _.live.register(new _.Live.Content_Tweet_Link());
})(FooBar.$, FooBar, FooBar.utils, FooBar.utils.is, FooBar.utils.obj, FooBar.utils.str);
"use strict";

(function ($, _, _utils, _is, _obj, _str) {
  _.Live.Content_Tweet_Message = _.Live.Field.extend({
    construct: function construct() {
      var self = this;

      self._super('foobar_notification-settings_tweet_group-field');
    },
    setup: function setup(data) {
      var self = this;
      self.initial = {
        text: self.getValue('tweet_text', data),
        drop_cap: self.getValue('tweet_drop_cap', data),
        side_border: self.getValue('tweet_side_border', data),
        show_link: self.getValue('tweet_show_link', data)
      };
    },
    applyChange: function applyChange(data) {
      var self = this,
          text = self.getValue('tweet_text', data),
          drop_cap = self.getValue('tweet_drop_cap', data),
          side_border = self.getValue('tweet_side_border', data),
          show_link = self.getValue('tweet_show_link', data);
      var redraw = false;

      if (self.hasChanged('text', text) || self.hasChanged('show_link', show_link)) {
        self.live.setMessageDirect({
          text: _.Live.tweetFormat(text),
          show_link: show_link,
          link_text: self.live.getValue('tweet_link_text', data),
          link_url: self.live.getValue('tweet_link_url', data),
          link_target: self.live.getValue('tweet_link_target', data)
        }, data);
        redraw = true;
      }

      if (self.hasChanged('drop_cap', drop_cap)) {
        self.live.setItemClass(drop_cap === 'yes' ? 'fbr-drop-cap' : '', 'fbr-drop-cap');
        redraw = true;
      }

      if (self.hasChanged('side_border', side_border)) {
        self.live.setItemClass(side_border === 'yes' ? 'fbr-side-border' : '', 'fbr-side-border');
        redraw = true;
      }

      self.finalize(redraw, false);
    }
  });

  _.live.register(new _.Live.Content_Tweet_Message());
})(FooBar.$, FooBar, FooBar.utils, FooBar.utils.is, FooBar.utils.obj, FooBar.utils.str);
"use strict";

(function ($, _, _utils, _is, _obj, _str) {
  _.Live.General_Layout = _.Live.Field.extend({
    construct: function construct() {
      var self = this;

      self._super('foobar_notification-settings_layout_group-field');

      self.layouts = ['fbr-layout-inline', 'fbr-layout-top-inline', 'fbr-layout-top', 'fbr-layout-bottom', 'fbr-layout-left', 'fbr-layout-left-top', 'fbr-layout-left-center', 'fbr-layout-left-bottom', 'fbr-layout-right', 'fbr-layout-right-top', 'fbr-layout-right-center', 'fbr-layout-right-bottom'];
    },
    setup: function setup(data) {
      var self = this;
      self.$inlineMetabox = $('#foobar_notification-inline_preview');
      self.$inlineContainer = $('.foobar_metabox_inline_preview_container');
      self.$inlineContainer.find('.foobar_metabox_inline_preview_content').hide();
      self.$body = $('body');
      self.initial = {
        layout: self.getLayout(data),
        layout_push: self.getValue('layout_push', data),
        open: self.getValue('open', data)
      };
    },
    applyChange: function applyChange(data) {
      var self = this,
          layout = self.getLayout(data),
          layout_push = self.getValue('layout_push', data),
          open = self.getValue('open', data);
      var redraw = false,
          reinit = false;

      if (self.hasChanged('layout', layout)) {
        self.live.setClass(layout, self.layouts);
        redraw = true;

        if (layout === 'fbr-layout-inline') {
          self.$inlineContainer.append(self.live.bar.$el);
          self.$inlineMetabox.show();
        } else {
          self.$body.append(self.live.bar.$el);
          self.$inlineMetabox.hide();
        }
      }

      if (self.hasChanged('layout_push', layout_push)) {
        self.live.setOption('push', layout_push === 'yes');
        redraw = true;
      }

      if (self.hasChanged('open', open)) {
        var option = {};

        if (open === 'open') {
          var transition = self.getValue('transition', data);

          if (transition !== '') {
            option.name = 'transition';
          } else {
            option.name = 'immediate';
          }
        }

        self.live.setOption('open', option);
        reinit = true;
      }

      self.finalize(redraw, reinit);
    },
    getLayout: function getLayout(data) {
      var self = this,
          layout = self.getValue('layout', data),
          layout_left = self.getValue('layout_left', data),
          layout_right = self.getValue('layout_right', data);
      if (layout_left !== null) return layout_left;
      if (layout_right !== null) return layout_right;
      return layout;
    }
  });

  _.live.register(new _.Live.General_Layout());
})(FooBar.$, FooBar, FooBar.utils, FooBar.utils.is, FooBar.utils.obj, FooBar.utils.str);
"use strict";

(function ($, _, _utils, _is, _obj, _str) {
  _.Live.General_ToggleButton = _.Live.Field.extend({
    construct: function construct() {
      var self = this;

      self._super('foobar_notification-settings_toggle_group-field');

      self.toggles = ['fbr-toggle-default', 'fbr-toggle-circle', 'fbr-toggle-overlap', 'fbr-toggle-none'];
      self.toggle_positions = ['fbr-toggle-left', 'fbr-toggle-right'];
    },
    setup: function setup(data) {
      var self = this;
      self.initial = {
        toggle: self.getValue('toggle', data),
        toggle_position: self.getValue('toggle_position', data)
      };
    },
    applyChange: function applyChange(data) {
      var self = this,
          toggle = self.getValue('toggle', data),
          toggle_position = self.getValue('toggle_position', data);
      var redraw = false,
          reinit = false;

      if (self.hasChanged('toggle', toggle)) {
        self.live.setClass(toggle, self.toggles);
        redraw = true;
      }

      if (self.hasChanged('toggle_position', toggle_position)) {
        self.live.setClass(toggle_position, self.toggle_positions);
        redraw = true;
      }

      self.finalize(redraw, reinit);
    }
  });

  _.live.register(new _.Live.General_ToggleButton());
})(FooBar.$, FooBar, FooBar.utils, FooBar.utils.is, FooBar.utils.obj, FooBar.utils.str);
"use strict";

(function ($, _) {
  var init = false;

  function liveInit() {
    if (!init) _.live.init();
    init = true;
  } //make sure both foofields and foobar are ready before initializing the live updates


  var foobarReady = false,
      foofieldsReady = false;

  _.on('ready', function () {
    foobarReady = true;

    if (foofieldsReady === true) {
      liveInit();
    }
  });

  $.on('ready', function () {
    foofieldsReady = true;

    if (foobarReady === true) {
      liveInit();
    }
  });
})(FooFields, FooBar);