/**
 * External dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	CardMedia,
	ExternalLink,
	Flex,
	FlexItem,
	Icon,
	Modal,
	ResponsiveWrapper,
} from '@wordpress/components';
import { commentContent, reusableBlock } from '@wordpress/icons';
import { Text } from '@woocommerce/experimental';

/**
 * Internal dependencies
 */
import extensionsSvg from './extensions.svg';
import { dismissRequest, remindLaterRequest } from './actions';

export class CheckSubscriptionModal extends Component {
	constructor( props ) {
		super( props );
		this.state = {
			isModalOpen: true,
		};
	}

	dismiss() {
		dismissRequest( this.props, ( response ) => {
			this.setState( { isModalOpen: false } )
		} );
	}

	remindLater() {
		remindLaterRequest( this.props, ( response ) => {
			this.setState( { isModalOpen: false } )
		} );
	}

	renderBenefits() {
		return (
			<div className="woocommerce-subscription-benefits">
				<div className="woocommerce-subscription-benefits__item">
					<div className="woocommerce-subscription-benefits__icon">
						<Icon icon={ reusableBlock } />
					</div>
					<div className="woocommerce-subscription-benefits__content">
						<Text
							as="h3"
							lineHeight={ "20px" }
							size={ "14px" }
							weight={ 600 }
						>
							{ __( 'New features and improvements', 'woocommerce' ) }
						</Text>
						<Text as="p">
							{ __( 'Continue receiving the latest product updates and ongoing improvements.', 'woocommerce' )
							}
						</Text>
					</div>
				</div>

				<div className="woocommerce-subscription-benefits__item">
					<div className="woocommerce-subscription-benefits__icon">
						<Icon icon={ commentContent } />
					</div>
					<div className="woocommerce-subscription-benefits__content">
						<Text
							as="h3"
							lineHeight={ "20px" }
							size={ "14px" }
							weight={ 600 }
						>
							{ __( 'Get help when you need it', 'woocommerce' ) }
						</Text>
						<Text as="p">
							{ __( 'Continue receiving streamlined support from our global support team.', 'woocommerce' )
							}
						</Text>
					</div>
				</div>

				<div className="woocommerce-subscription-benefits__item">
					<div className="woocommerce-subscription-benefits__icon">
						<Icon icon={ commentContent } />
					</div>
					<div className="woocommerce-subscription-benefits__content">
						<Text
							as="h3"
							lineHeight={ "20px" }
							size={ "14px" }
							weight={ 600 }
						>
							{ __( 'Support the ecosystem', 'woocommerce' ) }
						</Text>
						<Text as="p">
							{ __( 'This helps support the Woo ecosystem to continuously improve extensions and themes.', 'woocommerce' )
							}
							<ExternalLink href="#">{ __( 'Read more', 'woocommerce' ) }</ExternalLink>
						</Text>
					</div>
				</div>
			</div>
		)
	}

	renderPrimaryCard() {
		const isExpired = this.props.subscriptionState.expired;

		return (
			<Card className="primary">
				<CardHeader>
					<div>
						<Text
							className="subscription-status subscription-status__expired"
						>
							{
								isExpired
									? __( 'Expired', 'woocommerce' )
									: __( 'Unregistered', 'woocommerce' )
							}
						</Text>
					</div>
					<h2>
						{
							isExpired
								? sprintf(
									/* translators: %s is product name */
									__(
										'Renew %s',
										'woocommerce'
									),
									this.props.productName
								)
								: sprintf(
									/* translators: %s is product name */
									__(
										'Subscribe to %s',
										'woocommerce'
									),
									this.props.productName
								)
						}
					</h2>
				</CardHeader>
				<CardBody>
					{ this.renderBenefits() }
				</CardBody>
				<CardFooter>
					<Button
						isDefault
						onClick={ () => this.remindLater() }
					>
						{ __( 'Maybe later', 'woocommerce' ) }
					</Button>

					<Button
						isPrimary
						target="_blank"
						href={ this.props.manageSubscriptionsUrl }
						onClick={ () => this.dismiss() }
					>
						{
							isExpired
								? sprintf(
									/* translators: %s is product price */
									__( 'Renew for $%s', 'woocommerce' ),
									this.props.productRegularPrice
								)
								: sprintf(
									/* translators: %s is product price */
									__( 'Subscribe for $%s', 'woocommerce' ),
									this.props.productRegularPrice
								)
						}
					</Button>
				</CardFooter>
			</Card>
		);
	}

	renderSecondaryCard() {
		return (
			<Card className="secondary">
				<CardMedia>
					<ResponsiveWrapper naturalWidth={ 240 } naturalHeight={ 240 }>
						<img
							src={ extensionsSvg }
							alt=""
						/>
					</ResponsiveWrapper>
				</CardMedia>
			</Card>
		);
	}

	render() {
		const { isModalOpen } = this.state;
		if ( ! isModalOpen ) {
			return null;
		}

		return (
			<Modal
				style={ { borderRadius: '2px' } }
				onRequestClose={ () => this.dismiss() }
				className="woocommerce-check-subscription-modal"
			>
				<Flex
					gap={ 0 }
					align={ 'stretch' }
					direction={ [ 'column-reverse', 'row' ] }
				>
					<FlexItem>
						{ this.renderPrimaryCard() }
					</FlexItem>
					<FlexItem>
						{ this.renderSecondaryCard() }
					</FlexItem>
				</Flex>
			</Modal>
		);
	}
}