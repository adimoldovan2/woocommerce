<?php

namespace Automattic\WooCommerce\Admin\Features\Blueprint\Exporters;

class ExportTaxRates implements ExportsStepSchema {

	public function export() {
		global $wpdb;

		// @todo check to see if we already have a DAO for taxes.
		$rates = $wpdb->get_results("
			SELECT *
			FROM {$wpdb->prefix}woocommerce_tax_rates as tax_rates
		", ARRAY_A);

		$locations = $wpdb->get_results("
			SELECT *
			FROM {$wpdb->prefix}woocommerce_tax_rate_locations as locations
		", ARRAY_A);

		return compact('rates', 'locations');
	}

	public function export_step_schema() {
		return array(
			'step' => $this->get_step_name(),
			'values' => $this->export()
		);
	}

	public function get_step_name() {
	    return 'configureTaxRates';
	}
}