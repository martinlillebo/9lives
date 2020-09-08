class CatsController < ApplicationController
  def index
    @cats = Cat.all
  end

  def show
    if params[:id].present?
    @cat = Cat.find(params[:id])
  end
  end

  def new
    @cat = Cat.new
  end

  def create
    @new_cat = Cat.create!(strong_params)
    if @new_cat.save
      redirect_to root_path(@cat)
    else
      render :new
    end
  end

  private

  def strong_params
    params.require(:cat).permit(:name, :gender, :breed, :allergies, :mood, :photo) #returns a hash with the listed key/value pairs
  end

end
